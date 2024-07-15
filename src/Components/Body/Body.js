import { Button, Col, Container, Row } from "react-bootstrap";
import Product from "./Product";
import { useContext } from "react";
import ItemContext from "../../Context/item-context";
import Album1 from "../../Assets/Album 1.png"
import Album2 from "../../Assets/Album 2.png"
import Album3 from "../../Assets/Album 3.png"
import Album4 from "../../Assets/Album 4.png"

const productsArr = [
  {
    title: 'Colors',
    price: 100,
    imageUrl: Album1,
  },
  
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: Album2,
  },
  
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: Album3,
  },
  
  {
    title: 'Blue Color',
    price: 100,
    imageUrl: Album4,
  }
]
  
  
function Body ()
{
  const context = useContext ( ItemContext );

  return (
    <Container style = { { margin: "20px" } }>

      <Row>
        {
          productsArr.map ( 
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