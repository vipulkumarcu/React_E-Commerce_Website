import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Components/Pages/Home";
import About from "./Components/Pages/About";
import Contact from "./Components/Pages/Contact";
import ProductDetails from "./Components/Body/ProductDetails";
import Layout from "./Layout";
import Authenticate from "./Components/Pages/Authenticate";
import Body from "./Components/Body/Body";

const router = createBrowserRouter (
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/store", element: <Body /> },
        { path: "/about", element: <About /> },
        { path: "/contact", element: <Contact /> },
        { path: "/authenticate", element: <Authenticate /> },
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