import { useContext } from "react";
import { Button, Card, Container, Nav, Navbar } from "react-bootstrap";
import Cart from "./Cart";
import ItemContext from "../../Context/item-context";
import { Link } from "react-router-dom";

function Header ()
{
  const context = useContext ( ItemContext );

  return (
    <div>

      <Navbar variant = "dark" style = { { background: "black" } }>

        <Container>

          <Navbar.Collapse id="basic-navbar-nav"> 
            <Nav className="me-auto">
            <Nav.Link as = { Link } to = "/"> HOME </Nav.Link>
              <Nav.Link as = { Link } to = "/store"> STORE </Nav.Link>
              <Nav.Link as = { Link } to = "/about"> ABOUT </Nav.Link> 
              <Nav.Link as = { Link } to = "/contact"> CONTACT US </Nav.Link> 
            </Nav>
          </Navbar.Collapse>

          <Button variant = "outline-info" onClick = { context.toggleCartHandler }> Cart <sup> { context.cartItems.length } </sup> </Button>
          {
            context.toggleCart && <Cart toggleCart = { context.toggleCartHandler } />
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