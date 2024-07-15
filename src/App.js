import { createBrowserRouter, RouterProvider } from "react-router-dom";

import About from "./Components/Pages/About";
import Home from "./Components/Pages/Home";
import Store from "./Components/Pages/Store";

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
    ]
  )
  return (
    <RouterProvider router = { router }>
      
    </RouterProvider>
  );
}

export default App;