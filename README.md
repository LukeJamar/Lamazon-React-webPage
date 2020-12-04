# Lamazon React Web-Page
// C.S.3320 Internet Software Development
// Due Date: 12/03/2020
// Author: Frederick Jamar flj5

## Functionalities

### Login
    . Username, and Password fields
    . Submit button and event handler that calls the POST /user/login endpoint.
        Note, that to make this work, you will need to be sure and save and store the JWT token in EVERY request!
    . Welcome message that shows the users name
        Logging in should update the welcome message

### Store

    . Provide a list of items available from the store.  The list should be in a scrollable container (Links to an external site.) (you don't have to use the scroll container I suggest).
    . For each item, add a button and event handler that will add the item to the cart.  The event handler must call the POST /cart/:CartId/cartItem endpoint.  Remember, this will impact the cart (section 3), so elevate your state!
    . !!INCOMPLETE!! Provide a search filter for the items in the list.  The search filter must have an input field, a search button, and event handler.  The event handler must call the GET /StoreItem?query=abc endpoint

### Cart
. Create a scrollable container for the items in your cart, when items are added to the cart from the store, they should show up here!

