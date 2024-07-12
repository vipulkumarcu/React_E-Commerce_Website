import { Button, Card, Col, Container, Row } from "react-bootstrap";

function Product ( props )
{
  console.log(props.url);
  return (
    <Container style = { { margin: "10px" } }>

      <Card style = { { width: "15rem" } }>
        <Card.Img variant = "top" src = { props.url } />
      </Card>

      <Row>
        <Col>  Price: $. { props.price } </Col>
        <Col>
          <Button variant = "primary"> Add To Cart </Button>
        </Col>
      </Row>
      

    </Container>
  )
}

export default Product;