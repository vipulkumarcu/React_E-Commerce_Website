import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./Components/Pages/About";
import Home from "./Components/Pages/Home";
import Store from "./Components/Pages/Store";
import Contact from "./Components/Pages/Contact";
import ProductDetails from "./Components/Body/ProductDetails";

function App ()
{
  const router = createBrowserRouter (
    [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/store",
        element: <Store />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/product-details/:productId",
        element: <ProductDetails />
      },
    ]
  )
  return (
    <RouterProvider router = { router }>
      
    </RouterProvider>
  );
}

export default App;