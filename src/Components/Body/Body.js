import { Button, Col, Container, Row } from "react-bootstrap";
import Product from "./Product";

const productsArr = [

  {
  
  title: 'Colors',
  
  price: 100,
  
  imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  
  },
  
  {
  
  title: 'Black and white Colors',
  
  price: 50,
  
  imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  
  },
  
  {
  
  title: 'Yellow and Black Colors',
  
  price: 70,
  
  imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  
  },
  
  {
  
  title: 'Blue Color',
  
  price: 100,
  
  imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  
  }
  
]
  
  
function Body ()
{
  return (
    <Container style = { { margin: "20px" } }>

      <Row>
        {
          productsArr.map ( 
            ( product ) => (
              <Col key = { product.title } xs = { 6 } >
                <Product url = { product.imageUrl } price = { product.price } />
              </Col>
            )
          )
        }
      </Row>

      <Row>
        <Col style = { { textAlign: "center", margin: "25px" } }>
          <Button variant = "secondary"> See Cart </Button>
        </Col>
      </Row>

    </Container>
  )
}

export default Body;