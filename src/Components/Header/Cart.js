import { useContext } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ItemContext from "../../Context/item-context";

function Cart ( props )
{
  const context = useContext (ItemContext);

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
                context.cartItems.map (
                  ( element, index ) => (
                    <tr key = { element.title }>
                      <td> { ++index } </td>
                      <td> { element.title } </td>
                      <td> $ { element.price } </td>
                      <td> { element.quantity } </td>
                      <td> <Button variant = "danger" onClick = { () => context.removeItemFromCart ( element.title ) }> Remove </Button> </td>
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
          <Button variant = "dark" onClick = { props.toggleCart }> Close </Button>
          <Button variant = "warning" onClick = { () => { alert ("Purchase Successful"); props.toggleCart (); } }> Purchase </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default Cart;