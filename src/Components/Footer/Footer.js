import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Footer ()
{
  return (
    <Container fluid style = { { background: "#56CCF2", fontFamily: "Times New Roman", color: "white", textAlign: "center", marginTop: "1px", padding: "20PX" } }>
      
      <Row>

        <Col xs = { 6 } style = { { fontSize: "50px" } }> The Generics </Col>

        <Col xs = { 2 } className = "text-center">
          <a href="#"> <FontAwesomeIcon icon = { faYoutube } size = "2x" /> </a>
        </Col>

        <Col xs = { 2 } className="text-center">
          <a href="#"> <FontAwesomeIcon icon = { faSpotify } size = "2x" /> </a>
        </Col>

        <Col xs = { 2 } className="text-center">
          <a href="#"> <FontAwesomeIcon icon = { faShoppingCart } size = "2x" /> </a>
        </Col>

      </Row>
      
    </Container>
  )
}

export default Footer;