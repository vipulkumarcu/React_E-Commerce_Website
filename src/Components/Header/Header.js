import { useState } from "react";
import { Button, Card, Container, Nav, Navbar } from "react-bootstrap";
import Cart from "./Cart";

function Header ()
{
  const [ toggleCart, setTogglecart ] = useState ( false );

  function toggleCartFunc ()
  {
    setTogglecart ( prevvalue => !prevvalue );
  }

  return (
    <div>

      <Navbar variant = "dark" style = { { background: "black" } }>

        <Container>

          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="me-auto">
              <Nav.Link href = "#home"> HOME </Nav.Link>
              <Nav.Link href = "#link"> STORE </Nav.Link>
              <Nav.Link href = "#about"> ABOUT </Nav.Link>  
            </Nav>
          </Navbar.Collapse>

          <Button variant = "outline-info" onClick = { toggleCartFunc }> Cart </Button>
          {
            toggleCart && <Cart toggleCart={toggleCartFunc} />
          }  

        </Container>

      </Navbar>

      <Card style = { { background: "#777777", fontFamily: "Times New Roman", color: "white", padding: "40px", textAlign: "center", marginTop: "1px" } } >
        <Card.Title> <h1> The Generics </h1> </Card.Title>
      </Card>

    </div>
  )
}

export default Header;