import { Col, Container, Row } from "react-bootstrap";

function Footer ()
{
  return (
    <Container fluid style = { { background: "#56CCF2", fontFamily: "Times New Roman", color: "white", textAlign: "center", marginTop: "1px", padding: "20PX" } }>
      <Row>
        <Col xs = { 6 } style={{ fontSize: "50px" }}> The Generics </Col>
        <Col> YouTube </Col>
        <Col> Spotify </Col>
        <Col> Flipkart </Col>
      </Row>
    </Container>
  )
}

export default Footer;