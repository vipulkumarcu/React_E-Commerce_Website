import { Button, Col, Container, Row } from "react-bootstrap";
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
          <Button variant = "secondary" onClick = { context.toggleCartHandler } > See Cart </Button>
        </Col>
      </Row>

    </Container>
  )
}

export default Body;