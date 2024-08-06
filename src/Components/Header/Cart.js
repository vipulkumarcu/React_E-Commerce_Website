import { useContext } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ItemContext from "../../Context/item-context";

function Cart ( props )
{
  const context = useContext ( ItemContext );

  return (
    <>
      <Modal show = { props.showCart } onHide = { props.showCart }>

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
                context.cartItems.map (
                  ( element, index ) => (
                    <tr key = { element.title }>
                      <td> { ++index } </td>
                      <td> { element.title } </td>
                      <td> $ { element.price } </td>
                      <td> { element.quantity } </td>
                      <td> <Button variant = "outline-danger" onClick = { () => context.removeItemFromCart ( element.title ) }> Remove </Button> </td>
                    </tr>
                  )
                )
              }
            </tbody>

            <tfoot>
              <tr>
                <td colSpan = { 2 }> Total Price </td>
                <td> $ { context.cartPrice } </td>
              </tr>
            </tfoot>

          </Table>

        </Modal.Body>

        <Modal.Footer>
          <Button variant = "outline-dark" onClick = { props.showCart }> Close </Button>
          <Button variant = "outline-success" onClick = { () => { alert ("Purchase Successful"); props.showCart (); } }> Purchase </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default Cart;