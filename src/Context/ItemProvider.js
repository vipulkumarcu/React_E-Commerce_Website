import { useState, useEffect } from "react";
import ItemContext from "./item-context";
import Album1 from "../Assets/Album 1.png";
import Album2 from "../Assets/Album 2.png";
import Album3 from "../Assets/Album 3.png";
import Album4 from "../Assets/Album 4.png";

function ItemProvider(props) {
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

  const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const initialCartQuantity = JSON.parse(localStorage.getItem("cartQuantity")) || 0;
  const initialCartPrice = JSON.parse(localStorage.getItem("cartPrice")) || 0;
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [cartQuantity, setCartQuantity] = useState(initialCartQuantity);
  const [cartPrice, setCartPrice] = useState(initialCartPrice);
  const [toggleCart, setTogglecart] = useState(false);
  const initialToken = localStorage.getItem("Token");
  const [token, setToken] = useState(initialToken);
  const initialEmail = localStorage.getItem("Email");
  const [email, setEmail] = useState(initialEmail);
  const initialCartID = localStorage.getItem("Cart ID");
  const [cartID, setCartID] = useState(initialCartID);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartQuantity", JSON.stringify(cartQuantity));
    localStorage.setItem("cartPrice", JSON.stringify(cartPrice));
  }, [cartItems, cartQuantity, cartPrice]);

  function toggleCartHandler() {
    setTogglecart((prevValue) => !prevValue);
  }

  async function loginHandler(token, email, cartID) {
    setToken(token);
    localStorage.setItem("Token", token);

    setEmail(email);
    localStorage.setItem("Email", email);

    setCartID(cartID);
    localStorage.setItem("Cart ID", cartID);

    setUserIsLoggedIn((prev) => !prev);
    localStorage.setItem("Login Status", !userIsLoggedIn);

    // Fetch cart items for the logged-in user
    const response = await fetch("https://e-commerce-2a608-default-rtdb.firebaseio.com/user-cart-details.json");
    const data = await response.json();

    // Find the cart details for the logged-in user
    for (const key in data) {
      if (data[key].email === email) {
        setCartItems(data[key].cart);
        setCartQuantity(data[key].quantity);
        setCartPrice(data[key].total);
        setCartID(key); // Save the cartID
        localStorage.setItem("Cart ID", key);
        break;
      }
    }
  }

  function logoutHandler() {
    setToken(null);
    localStorage.removeItem("Token");

    setUserIsLoggedIn((prev) => !prev);
    localStorage.setItem("Login Status", userIsLoggedIn);

    setEmail(null);
    localStorage.removeItem("email");

    setCartItems([]);
    setCartQuantity(0);
    setCartPrice(0);
  }

  async function addItemToCart(item) {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((prevItem) => prevItem.title === item.title);
      let updatedItems = [...prevItems];

      if (existingItemIndex !== -1) {
        const updatedItem = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = [...prevItems, { ...item, quantity: 1 }];
      }

      const newQuantity = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const newPrice = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
      updateCartDetails(updatedItems, newQuantity, newPrice);

      return updatedItems;
    });
  }

  async function removeItemFromCart(title) {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.title !== title);
      const newQuantity = updatedItems.reduce((total, item) => total + item.quantity, 0);
      const newPrice = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
      updateCartDetails(updatedItems, newQuantity, newPrice);
      return updatedItems;
    });
  }

  async function saveCartDetails(cart, quantity, total) {
    if (cartID) {
      const response = await fetch(`https://e-commerce-2a608-default-rtdb.firebaseio.com/user-cart-details/${cartID}.json`, {
        method: "PUT",
        body: JSON.stringify({
          email: email,
          cart: cart,
          quantity: quantity,
          total: total,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        console.log("Cart Update Successful for ", cartID);
      } else {
        console.log("Cart Update Unsuccessful for ", cartID);
      }
    } else {
      const response = await fetch("https://e-commerce-2a608-default-rtdb.firebaseio.com/user-cart-details.json", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          cart: cart,
          quantity: quantity,
          total: total,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.name);
        setCartID(data.name);
        localStorage.setItem("Cart ID", data.name); // Correctly set the new Cart ID here
        console.log("Cart Created Successfully for ", data.name);
      } else {
        console.log("Cart Creation Unsuccessful");
      }
    }
  }

  function updateCartDetails(items, quantity, price) {
    setCartQuantity(quantity);
    setCartPrice(price);
    saveCartDetails(items, quantity, price);
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
    toggleCartHandler,
  };

  return <ItemContext.Provider value={itemContext}>{props.children}</ItemContext.Provider>;
}

export default ItemProvider;