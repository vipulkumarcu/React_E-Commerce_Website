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
      <Card style = { { width: "18rem", margin: "auto" } }>
        <Card.Img variant = "top" src = { props.product.imageUrl } className = "m-auto" />
        <Card.Body>
          <Row>
            <Col className = "text-start" xs = { 5 }> Price: $ { props.product.price } </Col>
            <Col className = "text-end" xs = { 7 }>
              <Button variant = "warning" onClick = { viewProduct }> View Product </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Product;