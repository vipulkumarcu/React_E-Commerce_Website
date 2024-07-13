import { useState } from "react";
import ItemContext from "./item-context";

function ItemProvider ( props )
{
  const [ cartItems, setCartItems ] = useState ( [] );
  const [ cartQuantity, setCartQuantity ] = useState ( 0 );
  const [ cartPrice, setCartPrice ] = useState ( 0 );
  const [ toggleCart, setTogglecart ] = useState ( false );

  function toggleCartHandler ()
  {
    setTogglecart ( prevvalue => !prevvalue );
  }

  function addItemToCart ( item )
  {
    setCartItems (
      ( prevItems ) => {
        const existingItemIndex = prevItems.findIndex ( ( prevItem ) => prevItem.title === item.title );
        let updatedItems = [ ...prevItems ];

        if ( existingItemIndex !== -1 )
        {
          const updatedItem = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1,
          };
          updatedItems[existingItemIndex] = updatedItem;
        }
        
        else
        {
          updatedItems = [ ...prevItems, { ...item, quantity: 1 } ];
        }

        updateCartDetails ( updatedItems );
        return updatedItems;
      }
    );
  }

  function removeItemFromCart ( title )
  {
    setCartItems (
      ( prevItems ) => {
        const updatedItems = prevItems.filter ( ( item ) => item.title !== title );
        updateCartDetails ( updatedItems );
        return updatedItems;
      }
    );
  }

  function updateCartDetails ( items )
  {
    const totalQuantity = items.reduce ( ( total, item ) => total + item.quantity, 0 );
    setCartQuantity ( totalQuantity );

    const totalPrice = items.reduce ( ( total, item ) => total + item.price * item.quantity, 0 );
    setCartPrice ( totalPrice );
  }

  const itemContext = {
      cartItems,
      cartQuantity,
      cartPrice,
      toggleCart,
      addItemToCart,
      removeItemFromCart,
      toggleCartHandler
    }

  return (
    <ItemContext.Provider value = { itemContext }>
      { props.children }
    </ItemContext.Provider>
  )
}

export default ItemProvider;