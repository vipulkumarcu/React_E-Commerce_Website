import { useContext, useState } from "react";
import { Badge, Button, Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import Cart from "./Cart";
import ItemContext from "../../Context/item-context";
import { NavLink, useNavigate } from "react-router-dom";

function Header ()
{
  const context = useContext ( ItemContext );
  const userIsLoggedIn = localStorage.getItem ( "Login Status" );
  const navigate = useNavigate ();

  const [ showCart, setShowCart ] = useState ( false );

  const navStyling = {
    margin: "0 15px",
    fontSize: "20px"
  };

  function showCartHandler ()
  {  
    setShowCart ( ( prevValue ) => ( !prevValue ) );
  }

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
              <Nav.Link as = { NavLink } to = "/" className = { ( { isActive } ) => ( isActive ? 'active' : '' ) } style = { navStyling }> HOME </Nav.Link>
              {
                <Nav.Link as = { NavLink } to = { userIsLoggedIn ? "/store" : "/authenticate"} className = { ( { isActive } ) => ( isActive ? 'active' : '' ) } style = { navStyling }> STORE </Nav.Link>
              }
              <Nav.Link as = { NavLink } to = "/about" className = { ( { isActive } ) => ( isActive ? 'active' : '' ) } style = { navStyling }> ABOUT </Nav.Link>
              <Nav.Link as = { NavLink } to = "/contact" className = { ( { isActive } ) => ( isActive ? 'active' : '' ) } style = { navStyling }> CONTACT US </Nav.Link>
              {
                !userIsLoggedIn &&
                <Nav.Link as = { NavLink } to = "/authenticate" className = { ( { isActive } ) => ( isActive ? 'active' : '' ) } style = { navStyling }> LOGIN </Nav.Link>
              }
            </Nav>

          </Navbar.Collapse>

          <Row>

            <Col>
              {
                userIsLoggedIn &&
                <Button  className = "shadow" variant = "outline-info" onClick = { showCartHandler } >
                  Cart &nbsp;
                  <Badge className = "shadow" pill bg = "dark"> { context.cartItems.length } </Badge>
                </Button>
              }
            </Col>

            <Col xs = { 2 }>
              {
                userIsLoggedIn && <Button  className = "shadow" variant = "outline-danger" onClick = { logout }> Logout </Button>
              }
            </Col>
          
          </Row> 

          {
            showCart && <Cart showCart = { showCartHandler } />
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