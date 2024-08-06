import { useState } from "react";
import ItemContext from "./item-context";
import Album1 from "../Assets/Album 1.png";
import Album2 from "../Assets/Album 2.png";
import Album3 from "../Assets/Album 3.png";
import Album4 from "../Assets/Album 4.png";

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
  ];

  // Variables for Cart
  const [ cartItems, setCartItems ] = useState ( [] );
  const [ cartQuantity, setCartQuantity ] = useState ( 0 );
  const [ cartPrice, setCartPrice ] = useState ( 0 );
  const [ showCart, setShowCart ] = useState ( false );

  // Variables for Login
  const initialToken = localStorage.getItem ("Token");
  const [ token, setToken ] = useState ( initialToken );

  const initialEmail = localStorage.getItem ("Email");
  const [ email, setEmail ] = useState ( initialEmail );

  const initialCartID = localStorage.getItem ( "Cart ID" );
  const [ cartID, setCartID ] = useState ( initialCartID );

  const [ userIsLoggedIn, setUserIsLoggedIn ] = useState ( !!initialToken );

  // Function to Toggle Cart Visibility 
  function showCartHandler ()
  {  
    setShowCart ( ( prevValue ) => ( !prevValue ) );
  }

  // Function to store Login information in Local Storage
  function loginHandler ( token, email )
  {
    setToken ( token );
    localStorage.setItem ( "Token", token );

    setEmail ( email );
    localStorage.setItem ( "Email", email );

    setUserIsLoggedIn ( true );
    localStorage.setItem ( "Login Status", userIsLoggedIn );

    fetchCartItems ( email );
  }

  // Function to remove Login information from Local Storage
  function logoutHandler ()
  {
    setToken ( null );
    localStorage.removeItem ( "Token" );

    localStorage.removeItem ( "Login Status", userIsLoggedIn );

    setEmail( null );
    localStorage.removeItem ( "Email" );

    setCartID ( null );
    localStorage.removeItem ( "Cart ID" )
  }

  // Function to fetch data from the database
  async function fetchCartItems ( email )
  {
    const response = await fetch ( "https://e-commerce-2a608-default-rtdb.firebaseio.com/user-cart-details.json" );

    const data = await response.json ();
    
    for ( const key in data )
    {
      if ( data[key].email === email )
      {
        setCartItems ( data[key].cart );
        setCartQuantity ( data[key].quantity );
        setCartPrice ( data[key].total );
        setCartID ( key );
        localStorage.setItem ( "Cart ID", key );
        break;
      }
    }
  }

  // Function to add items to Cart and Database
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

  // Function to remove items from Cart and Database
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

  // Function to Add and Update Database
  async function saveCartDetails ( cart, quantity, total )
  {
    if ( cartID )
    {
      const response = await fetch ( `https://e-commerce-2a608-default-rtdb.firebaseio.com/user-cart-details/${cartID}.json`,
        {
          method: "PUT",
          body: JSON.stringify (
            {
              email: email,
              cart: cart,
              quantity: quantity,
              total: total,
            }
          ),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json ();

      if ( response.ok )
      {
        console.log ( data );
        console.log ( "Cart Update Successful for ", cartID );
      }
      
      else
      {
        console.log ( "Cart Update Unsuccessful for ", cartID );
      }
    }
    
    else
    {
      const response = await fetch ( "https://e-commerce-2a608-default-rtdb.firebaseio.com/user-cart-details.json",
        {
          method: "POST",
          body: JSON.stringify (
            {
              email: email,
              cart: cart,
              quantity: quantity,
              total: total,
            }
          ),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json ();

      if ( response.ok )
      {
        console.log ( data.name );
        setCartID ( data.name );
        localStorage.setItem ( "Cart ID", data.name );
        console.log ( "Cart Created Successfully for ", data.name );
      }
      
      else
      {
        console.log ( "Cart Creation Unsuccessful" );
      }
    }
  }

  // Function that updates Cart and also updates database
  function updateCartDetails ( items )
  {
    const totalQuantity = items.reduce ( ( total, item ) => total + item.quantity, 0 );
    setCartQuantity ( totalQuantity );

    const totalPrice = items.reduce ( ( total, item ) => total + item.price * item.quantity, 0 );
    setCartPrice ( totalPrice );

    saveCartDetails( items, totalQuantity, totalPrice );
  }

  const itemContext = {
    productsArr,
    cartItems,
    cartQuantity,
    cartPrice,
    showCart,
    token,
    userIsLoggedIn,
    loginHandler,
    logoutHandler,
    addItemToCart,
    removeItemFromCart,
    showCartHandler,
  };

  return (
    <ItemContext.Provider value = { itemContext }>
      { props.children }
    </ItemContext.Provider>
  );
}

export default ItemProvider;