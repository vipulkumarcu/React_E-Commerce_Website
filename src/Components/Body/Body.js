import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import Product from "./Product";
import { useContext } from "react";
import ItemContext from "../../Context/item-context";
  
function Body ()
{
  const context = useContext ( ItemContext );

  return (
    <Container style = { { margin: "20px" } }>

      <Row>
        {
          context.productsArr.map ( 
            ( product ) => (
              <Col key = { product.title } xs = { 6 } >
                <Product product = { product } />
              </Col>
            )
          )
        }
      </Row>

      <Row>
        <Col style = { { textAlign: "center", margin: "25px" } }>
          <Button className = "shadow-lg" variant = "outline-dark" onClick = { context.toggleCartHandler } > 
            See Cart &nbsp;
            <Badge className = "shadow" pill bg = "info"> { context.cartItems.length } </Badge>
          </Button>
        </Col>
      </Row>

    </Container>
  )
}

export default Body;