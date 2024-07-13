import React from "react"

const ItemContext = React.createContext (
  {
    cartItems: [],
    totalQuantity: null,
    totalPrice: null,
    toggleCart: null,
    addItemToCart: ( item ) => {},
    removeItemFromCart: ( id ) => {},
    toggleCartHandler: () => {}
  }
)

export default ItemContext;