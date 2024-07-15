import Body from "../Body/Body";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Store ()
{
  return (
    <>
      <header>
        <Header/>
      </header>

      <main>
        <Body/>
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Store;
