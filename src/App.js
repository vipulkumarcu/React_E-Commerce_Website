import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Components/Pages/Home";
import Store from "./Components/Pages/Store";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import ProductDetails from "./Components/Body/ProductDetails";
import Layout from "./Layout";
import Login from "./Components/Pages/Login";

const router = createBrowserRouter (
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/store", element: <Store /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/login", element: <Login /> },
        { path: "/product-details/:productId", element: <ProductDetails /> },
      ],
    },
  ]
);

function App ()
{
  return <RouterProvider router = { router } />;
}

export default App;