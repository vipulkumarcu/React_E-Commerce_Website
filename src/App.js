import { createBrowserRouter, RouterProvider } from "react-router-dom";

import About from "./Components/Pages/About";
import Home from "./Components/Pages/Home";

function App ()
{
  const router = createBrowserRouter (
    [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/About",
        element: <About />
      }
    ]
  )
  return (
    <RouterProvider router = { router }>
      
    </RouterProvider>
  );
}

export default App;