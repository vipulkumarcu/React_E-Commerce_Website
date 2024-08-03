import { useState } from "react";
import ItemContext from "./item-context";
import Album1 from "../Assets/Album 1.png"
import Album2 from "../Assets/Album 2.png"
import Album3 from "../Assets/Album 3.png"
import Album4 from "../Assets/Album 4.png"

function ItemProvider ( props )
{
  const productsArr = [
    {
      title: 'Album1',
      price: 100,
      imageUrl: Album1,
    },
    
    {
      title: 'Album2',
      price: 50,
      imageUrl: Album2,
    },
    
    {
      title: 'Album3',
      price: 70,
      imageUrl: Album3,
    },
    
    {
      title: 'Album4',
      price: 100,
      imageUrl: Album4,
    }
  ]

  const [ cartItems, setCartItems ] = useState ( [] );
  const [ cartQuantity, setCartQuantity ] = useState ( 0 );
  const [ cartPrice, setCartPrice ] = useState ( 0 );
  const [ toggleCart, setTogglecart ] = useState ( false );
  const initialToken = localStorage.getItem ( "token" );
  const[ token, setToken ] = useState ( initialToken );

  const userIsLoggedIn = !!token;

  function toggleCartHandler ()
  {
    setTogglecart ( prevvalue => !prevvalue );
  }

  function loginHandler ( token )
  {
    setToken ( token );
    localStorage.setItem ( "token", token );
  }

  function logoutHandler ()
  {
    setToken ( null );
    localStorage.removeItem ( "token" );
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
    productsArr,
    cartItems,
    cartQuantity,
    cartPrice,
    toggleCart,
    token,
    userIsLoggedIn,
    loginHandler,
    logoutHandler,
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