import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ItemContext from "../../Context/item-context";

function Product ( props )
{
  const context = useContext ( ItemContext );

  function addTocart ()
  {
    const item = {
      title: props.product.title,
      price: props.product.price,
    }

    context.addItemToCart ( item );
  }

  return (
    <Container style = { { margin: "10px" } }>

      <Card style = { { width: "15rem" } }>
        <Card.Img variant = "top" src = { props.product.imageUrl } />
      </Card>

      <Row>
        <Col>  Price: $. { props.product.price } </Col>
        <Col>
          <Button variant = "primary" onClick = { addTocart }> Add To Cart </Button>
        </Col>
      </Row>
      

    </Container>
  )
}

export default Product;