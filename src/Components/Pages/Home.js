import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";

function Home ()
{
  const [ alertMessage, setAlertMessage ] = useState ( "" );
  const [ alertVariant, setAlertVariant ] = useState ( "danger" );

  function submitHandler ()
  {
    setAlertMessage ( "Tickets to this tour are not available at the moment." );
    setAlertVariant ( "secondary" );
  }

  return (
    <>

      {
        alertMessage && 
        (
          <Alert variant = { alertVariant } onClose = { () => setAlertMessage ( "" ) } dismissible >
            { alertMessage }
          </Alert>
        )
      }

      <Container className = "m-5"  style = { { textAlign: "center" } }>

        <Row className = "m-3">
          <Col> <h2> Tours </h2> </Col>
        </Row>

        <Row className = "d-flex border-bottom border-1 border-dark py-2">
          <Col> Jul 16 </Col>
          <Col> DETROIT, MI </Col>
          <Col> DTE ENERGY MUSIC THEATRE </Col>
          <Col>
            <Button variant = "outline-info" onClick = { submitHandler }> Buy Tickets </Button>
          </Col>
        </Row>

        <Row className = "d-flex border-bottom border-1 border-dark py-2">
          <Col> Jul 19 </Col>
          <Col> TORONTO,ON </Col>
          <Col> BUDWEISER STAGE </Col>
          <Col>
            <Button variant = "outline-info" onClick = { submitHandler }> Buy Tickets </Button>
          </Col>
        </Row>

        <Row className = "d-flex border-bottom border-1 border-dark py-2">
          <Col> Jul 22 </Col>
          <Col> BRISTOW, VA </Col>
          <Col> JIGGY LUBE LIVE </Col>
          <Col>
            <Button variant = "outline-info" onClick = { submitHandler }> Buy Tickets </Button>
          </Col>
        </Row>

        <Row className = "d-flex border-bottom border-1 border-dark py-2">
          <Col> Jul 29 </Col>
          <Col> PHOENIX, AZ </Col>
          <Col> AK-CHIN PAVILION </Col>
          <Col>
            <Button variant = "outline-info" onClick = { submitHandler }> Buy Tickets </Button>
          </Col>
        </Row>

        <Row className = "d-flex border-bottom border-1 border-dark py-2">
          <Col> Aug 2 </Col>
          <Col> LAS VEGAS, NV </Col>
          <Col> T-MOBILE ARENA </Col>
          <Col>
            <Button variant = "outline-info" onClick = { submitHandler }> Buy Tickets </Button>
          </Col>
        </Row>

        <Row className = "d-flex border-bottom border-1 border-dark py-2">
          <Col> Aug 7 </Col>
          <Col> CONCORD, CA </Col>
          <Col> CONCORD PAVILION </Col>
          <Col>
            <Button variant = "outline-info" onClick = { submitHandler }> Buy Tickets </Button>
          </Col>
        </Row>
        
      </Container>

    </>
  )
}

export default Home;