import { Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

function Layout ()
{
  return (
    <>
      <Header />

      <main style = { { padding: "20px" } }>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default Layout;