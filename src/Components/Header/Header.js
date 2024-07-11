import { Button, Card, Container, Navbar } from "react-bootstrap";

function Header ()
{
  return (
    <div>

      <Navbar variant = "dark" style = { { background: "black" } }>
        <Container>
          <Navbar.Brand href = "#"> Home </Navbar.Brand>
          <Navbar.Brand href = "#"> Store </Navbar.Brand>
          <Navbar.Brand href = "#"> About </Navbar.Brand>
          <Button variant = "outline-info"> Cart </Button>
        </Container>
      </Navbar>

      <Card style = { { background: "#777777", color: "white", paddingBottom: "60px", textAlign: "center", marginTop: "1px" } }>
        <Card.Title> <h1> THE GENERICS </h1> </Card.Title>
      </Card>

    </div>
  )
}

export default Header;
