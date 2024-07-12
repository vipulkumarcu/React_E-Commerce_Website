import { useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";

const initialCartElements = [

  {
    title: 'Colors',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    quantity: 2,
  },
  
  {
    title: 'Black and white Colors',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    quantity: 3,
  },
  
  {
    title: 'Yellow and Black Colors',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    quantity: 1,
  }
  
]

function Cart ( props )
{
  const [ cartElements, setCartElements ] = useState ( initialCartElements );

  function removeItem ( title )
  {
    const updatedCart = cartElements.filter(item => item.title !== title);
    setCartElements ( updatedCart );
  }

  const totalPrice = cartElements.reduce ( ( total, item ) => total + item.price * item.quantity, 0 );


  return (
    <>
      <Modal show = { props.toggleCart } onHide = { props.toggleCart }>

        <Modal.Header closeButton>
          <Modal.Title> Your Cart </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Table striped>

            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {
                cartElements.map (
                  ( element, index ) => (
                    <tr key = { element.title }>
                      <td> { ++index } </td>
                      <td> { element.title } </td>
                      <td> $ { element.price } </td>
                      <td> { element.quantity } </td>
                      <td> <Button variant = "danger" onClick = { () => removeItem ( element.title ) }> Remove </Button> </td>
                    </tr>
                  )
                )
              }
            </tbody>

            <tfoot>
              <tr>
                <td colSpan = { 2 }> Total Price </td>
                <td> $ { totalPrice } </td>
              </tr>
            </tfoot>

          </Table>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick = { props.toggleCart }> Close </Button>
          <Button variant="primary" onClick = { props.toggleCart }> Purchase </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default Cart;