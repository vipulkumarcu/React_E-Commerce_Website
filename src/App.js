import Body from "./Components/Body/Body";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";

function App ()
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
  );
}

export default App;