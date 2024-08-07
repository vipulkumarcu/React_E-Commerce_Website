import { useContext } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import ItemContext from "../../Context/item-context";

function Cart ( props )
{
  const context = useContext ( ItemContext );

  return (
    <>
      <Modal show = { props.showCart } onHide = { props.showCart } >

        <Modal.Header className = "shadow" closeButton>
          <Modal.Title> Your Cart </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Table className = "shadow" striped = "columns" bordered  hover >

            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th colSpan = { 2 }></th>
              </tr>
            </thead>

            <tbody>
              {
                context.cartItems.map (
                  ( element, index ) => (
                    <tr className = "shadow" key = { element.title }>
                      <td> { ++index } </td>
                      <td> { element.title } </td>
                      <td> $ { element.price } </td>
                      <td> { element.quantity } </td>
                      <td> <Button className = "shadow" variant = "warning" onClick = { () => context.addItemToCart ( element ) }> + </Button> </td>
                      <td> <Button className = "shadow" variant = "danger" onClick = { () => context.removeItemFromCart ( element.title ) }> - </Button> </td>
                    </tr>
                  )
                )
              }
            </tbody>

            <tfoot className = "shadow">
              <tr>
                <td colSpan = { 2 }> Total Price </td>
                <td> $ { context.cartPrice } </td>
                <td colSpan = { 4 }></td>
              </tr>
            </tfoot>

          </Table>

        </Modal.Body>

        <Modal.Footer className = "shadow" >
          <Button className = "shadow" variant = "outline-dark" onClick = { props.showCart }> Close </Button>
          <Button className = "shadow" variant = "outline-success" onClick = { () => { alert ("Purchase Successful"); props.showCart (); } }> Purchase </Button>
        </Modal.Footer>

      </Modal>
    </>
  )
}

export default Cart;