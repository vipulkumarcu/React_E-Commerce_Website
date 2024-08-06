import React from "react"

const ItemContext = React.createContext (
  {
    cartItems: [],
    totalQuantity: null,
    totalPrice: null,
    toggleCart: null,
    token: "",
    isLoggedIn: null,
    login: ( token ) => {},
    logout: () => {},
    addItemToCart: ( item ) => {},
    removeItemFromCart: ( id ) => {},
    showCartHandler: () => {}
  }
)

export default ItemContext;