import React from "react"

const ItemContext = React.createContext (
  {
    cartItems: [],
    totalQuantity: null,
    totalPrice: null,
    toggleCart: null,
    token: "",
    isLoggedIn: false,
    login: ( token ) => {},
    logout: () => {},
    addItemToCart: ( item ) => {},
    removeItemFromCart: ( id ) => {},
    toggleCartHandler: () => {}
  }
)

export default ItemContext;