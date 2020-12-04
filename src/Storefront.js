// C.S.3320 Internet Software Development
// Due Date: 12/03/2020
// Author: Frederick Jamar flj5
import React from 'react';
import axios from 'axios';


// class: login - main interface with the REST database service
// Extends react component
class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userGreeting: false,
            login: '',
            password: '',
            jwt: '',
            userId: '',
            cartId: '',
            searchField: '',
            cart: [],
            storeItems: [],

        }
        this.loginEventHandler = this.loginEventHandler.bind(this);
        this.loginInputHandler = this.loginInputHandler.bind(this);
        this.passwordInputHandler = this.passwordInputHandler.bind(this);
        this.storeSearchInputHandler = this.storeSearchInputHandler.bind(this);
        this.showUserCart = this.showUserCart.bind(this);
        this.showStoreItems = this.showStoreItems.bind(this);
        this.showUserGreeting = this.showUserGreeting.bind(this);
    }


    // loginEventHandler() - Obtains user credentials from state and get's
    // back a user from the service.
    // calls getCart() to display the user's cart
    // calls getStoreList to display the store items
    async loginEventHandler() {
        const loginBody = {
            login: this.state.login,
            password: this.state.password
        }

        const responce =  await axios.post('http://localhost:8080/user/login', loginBody);
        this.setState({jwt: responce.data.jwt, userId: responce.data.userId});
        this.setState({userGreeting: true});
        await this.getCart();       //
        await this.getStoreList();
    };

    // Function to retrun the state of a user's cart
    showUserCart() {
        return this.state.cart;
    }
    
    // Calls service to assign user cart to state's cart
    async getCart() {
        const responce = await axios.get('http://localhost:8080/user/' + this.state.userId +'/cart');
        const listArray = [];
        responce.data.cartItems.forEach(cartItem => {
            listArray.push(<li>Cart Item ID: {cartItem._id} quantity: {cartItem.quantity}</li>);
        });
        this.setState({cart: listArray});
        this.setState({cartId: responce.data._id});
    }

    // Get Store Item list to display
    async getStoreList() {
        try{
            const responce = (await axios.get('http://localhost:8080/StoreItem/')).data;
            const StoreItemList = responce.map((item, index) =>
            <li key={index}>
                Name: {item.name} <button onClick = {() => this.addItemEventHandler(item._id)}>Add to Cart</button>
                <br></br>
                Quantity {item.quantity} <br></br>
                Description: {item.description}<br></br> <br></br> </li>
            )
            this.setState({storeItems: (<ul>{StoreItemList}</ul>)});
        } catch (err) {
            console.log(err);
        }
    }

    // Function should return the state of the Store Item List
    showStoreItems() {
        return this.state.storeItems;
    }

    // addItemEventHandler() - and a single quantity of an item to
    // the current user's cart, activated by "add to cart" button
    async addItemEventHandler(strItemId) {
        const cartBody = {
            storeItemId: strItemId,
            quantity: 1
        }
        const responce = await axios.post('http://localhost:8080/cart/' + this.state.cartId +'/cartItem', cartBody);
        // console.log(responce.data);
        await this.getCart();
    }

    // storeSearchEventHandler() - designed to return a list from the fiven string
    // in the searchField state.
    // ERROR - There is a malfunction in the code that could not be solved
    // before submission
    async storeSearchEventHandler() {
        try {
            // axios call is not being recognized for some reason.
            const responce = await axios.get('http://localhost:8080/StoreItem?name=' + this.state.searchField);
            // Test if the the querey matches any name
            if (responce) {
                const StoreItemList = responce.map((item, index) =>
                <li key={index}>
                    Name: {item.name} <button onClick = {() => this.addItemEventHandler(item._id)}>Add to Cart</button>
                    <br></br>
                    Quantity {item.quantity} <br></br>
                    Description: {item.description}<br></br> <br></br> </li>
                )
                this.setState({storeItems: (<ul>{StoreItemList}</ul>)});
                return; // leave the function once a querey is found
            }
        }catch (err) {
            console.log(err);
        }

            /*responce = await axios.get('http://localhost:8080/StoreItem?description=' + this.state.searchField);

            if (responce) {
                const StoreItemList = responce.map((item, index) =>
                <li key={index}>
                    Name: {item.name} <button onClick = {() => this.addItemEventHandler(item._id)}>Add to Cart</button>
                    <br></br>
                    Quantity {item.quantity} <br></br>
                    Description: {item.description}<br></br> <br></br> </li>
                )
                this.setState({storeItems: (<ul>{StoreItemList}</ul>)});
                return; // leave the function once a querey is found
            } else {
                return;
            }
            */

        //} catch (err) {
        //    alert("you must log in first!");
        //} 
    }


    // Event handlers for the two text fields
    loginInputHandler(event) {
        this.setState({login: event.target.value})
    }

    passwordInputHandler(event) {
        this.setState({password: event.target.value})
    }

    storeSearchInputHandler(event) {
        this.setState({searchField: event.target.value})
    }

    showUserGreeting() {
        if (this.state.userGreeting) {
            return <span>Welcome back to Lamazon {this.state.login.split('.')[0]}!</span>
        } else {
            return <span>Welcome to Lamazon!</span>
        }
    }


    render() {
        return (
            <div>
                <input placeholder = "Login" onBlur = {this.loginInputHandler}></input>
                <input type = "password" placeholder = "Password" onBlur = {this.passwordInputHandler}></input> 
                <button onClick = {this.loginEventHandler}>Log In!</button> 
                <br></br>
                <span>{this.showUserGreeting()}</span>
                <br></br>
                <ul>{this.showUserCart()/*This is example work*/}</ul>
                <input placeholder = "Store Search" onBlur = {this.storeSearchInputHandler}></input>
                <button onClick = {this.storeSearchEventHandler}>Search!</button>
                <ul>{this.showStoreItems()}</ul>
            </div>
        )
    };

}


export default login;