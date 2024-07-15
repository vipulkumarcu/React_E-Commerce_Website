import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ItemContext from "../../Context/item-context";

function Product ( props )
{
  const context = useContext ( ItemContext );

  function addToCart ()
  {
    const item = {
      title: props.product.title,
      price: props.product.price,
    }

    context.addItemToCart ( item );
  }

  return (
    <Container style = { { margin: "10px" } }>
      <Card style = { { width: "18rem", margin: "auto" } }>
        <Card.Img variant = "top" src = { props.product.imageUrl } className = "m-auto" />
        <Card.Body>
          <Row>
            <Col className = "text-start"> Price: $ { props.product.price } </Col>
            <Col className = "text-end">
              <Button variant = "primary" onClick = { addToCart }> Add To Cart </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Product;