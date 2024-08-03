import { useContext } from "react";
import { Badge, Button, Card, Container, Nav, Navbar } from "react-bootstrap";
import Cart from "./Cart";
import ItemContext from "../../Context/item-context";
import { NavLink } from "react-router-dom";

function Header ()
{
  const context = useContext ( ItemContext );
  const userIsLoggedIn = localStorage.getItem ( "Login Status" );
  console.log("header", userIsLoggedIn);
  

  return (
    <div>

      <Navbar variant = "dark" style = { { background: "black" } }>

        <Container>

          <Navbar.Collapse id = "basic-navbar-nav">

            <Nav className = "mx-auto">
              <Nav.Link as = { NavLink } to = "/" exact activeClassName="active" style = { { margin: "0 15px", fontSize: "20px" } }> HOME </Nav.Link>
              {
                <Nav.Link as = { NavLink } to = { userIsLoggedIn ? "/store" : "/login"} activeClassName="active" style = { { margin: "0 15px", fontSize: "20px" } }> STORE </Nav.Link>
              }
              <Nav.Link as = { NavLink } to = "/about" activeClassName="active" style = { { margin: "0 15px", fontSize: "20px" } }> ABOUT </Nav.Link>
              <Nav.Link as = { NavLink } to = "/contact" activeClassName="active" style = { { margin: "0 15px", fontSize: "20px" } }> CONTACT US </Nav.Link>
              <Nav.Link as = { NavLink } to = "/login" activeClassName="active" style = { { margin: "0 15px", fontSize: "20px" } }> LOGIN </Nav.Link>
            </Nav>

          </Navbar.Collapse>

          <Button variant = "outline-info" onClick = { context.toggleCartHandler } >
            Cart &nbsp;
            <Badge pill bg = "dark"> { context.cartItems.length } </Badge>
          </Button>
          {
            context.toggleCart && <Cart toggleCart = { context.toggleCartHandler } />
          }  

        </Container>

      </Navbar>

      <Card style = { { background: "#777777", fontFamily: "Times New Roman", color: "white", padding: "40px", textAlign: "center", marginTop: "1px" } } >
        <Card.Title> <h1 style = { { fontSize: "70px" } }> The Generics </h1> </Card.Title>
      </Card>

    </div>
  )
}

export default Header;