import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

function Product ( props )
{
  const navigate = useNavigate ();

  function viewProduct ()
  {
    navigate (`/product-details/${ props.product.title }` );
  }

  return (
    <Container style = { { margin: "10px" } }>
      <Card className = "shadow" style = { { width: "18rem", margin: "auto" } }>
        <Card.Img variant = "top" src = { props.product.imageUrl } className = "m-auto" onClick = { viewProduct }/>
        <Card.Body>
          <Row>
            <Col className = "text-start" xs = { 5 }> Price: $ { props.product.price } </Col>
            <Col className = "text-end" xs = { 7 }>
              <Button className = "shadow-lg" variant = "outline-primary" onClick = { viewProduct }> View Product </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Product;