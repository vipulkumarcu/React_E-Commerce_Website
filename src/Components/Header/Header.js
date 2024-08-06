import { useContext } from "react";
import { Badge, Button, Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import Cart from "./Cart";
import ItemContext from "../../Context/item-context";
import { NavLink, useNavigate } from "react-router-dom";

function Header ()
{
  const context = useContext ( ItemContext );
  const userIsLoggedIn = localStorage.getItem ( "Login Status" );
  const navigate = useNavigate ();

  function logout ()
  {
    context.logoutHandler ();
    navigate ( "/" );
  }

  return (
    <div>

      <Navbar variant = "dark" style = { { background: "black" } }>

        <Container>

          <Navbar.Collapse id = "basic-navbar-nav">

            <Nav className = "mx-auto">
              <Nav.Link as = { NavLink } to = "/" className = { ( { isActive } ) => ( isActive ? 'active' : '' ) } style = { { margin: "0 15px", fontSize: "20px" } }> HOME </Nav.Link>
              {
                <Nav.Link as = { NavLink } to = { userIsLoggedIn ? "/store" : "/authenticate"} className = { ( { isActive } ) => ( isActive ? 'active' : '' ) } style = { { margin: "0 15px", fontSize: "20px" } }> STORE </Nav.Link>
              }
              <Nav.Link as = { NavLink } to = "/about" className = { ( { isActive } ) => ( isActive ? 'active' : '' ) } style = { { margin: "0 15px", fontSize: "20px" } }> ABOUT </Nav.Link>
              <Nav.Link as = { NavLink } to = "/contact" className = { ( { isActive } ) => ( isActive ? 'active' : '' ) } style = { { margin: "0 15px", fontSize: "20px" } }> CONTACT US </Nav.Link>
              {
                !userIsLoggedIn &&
                <Nav.Link as = { NavLink } to = "/authenticate" className = { ( { isActive } ) => ( isActive ? 'active' : '' ) } style = { { margin: "0 15px", fontSize: "20px" } }> LOGIN </Nav.Link>
              }
            </Nav>

          </Navbar.Collapse>

          <Row>

            <Col>
              {
                userIsLoggedIn &&
                <Button variant = "outline-info" onClick = { context.showCartHandler } >
                  Cart &nbsp;
                  <Badge pill bg = "dark"> { context.cartItems.length } </Badge>
                </Button>
              }
            </Col>

            <Col xs = { 2 }>
              {
                userIsLoggedIn && <Button variant = "outline-danger" onClick = { logout }> Logout </Button>
              }
            </Col>
          
          </Row> 

          {
            context.showCart && <Cart showCart = { context.showCartHandler } />
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