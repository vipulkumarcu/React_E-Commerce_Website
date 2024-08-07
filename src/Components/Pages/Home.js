import { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";

function Home ()
{
  const tours = [
    { date: "Jul 16", location: "DETROIT, MI", venue: "DTE ENERGY MUSIC THEATRE" },
    { date: "Jul 19", location: "TORONTO, ON", venue: "BUDWEISER STAGE" },
    { date: "Jul 22", location: "BRISTOW, VA", venue: "JIGGY LUBE LIVE" },
    { date: "Jul 29", location: "PHOENIX, AZ", venue: "AK-CHIN PAVILION" },
    { date: "Aug 2", location: "LAS VEGAS, NV", venue: "T-MOBILE ARENA" },
    { date: "Aug 7", location: "CONCORD, CA", venue: "CONCORD PAVILION" },
  ];

  const [ alertMessage, setAlertMessage ] = useState ( "" );
  

  function submitHandler ()
  {
    const userIsLoggedIn = localStorage.getItem ( "Login Status" );
    userIsLoggedIn ?
      setAlertMessage ( "Tickets to this tour are not available at the moment." ) : 
      setAlertMessage ( "Login to buy tickets to this tour." )
  }

  return (
    <>

      {
        alertMessage && 
        (
          <Alert className = "shadow" variant = "dark" onClose = { () => setAlertMessage ( "" ) } dismissible >
            { alertMessage }
          </Alert>
        )
      }

      <Container className = "m-5"  style = { { textAlign: "center" } }>

        <Row className = "m-3">
          <Col> <h2> Tours </h2> </Col>
        </Row>

        {
          tours.map ( ( tour, index ) => (
              <Row key = { index } className = "d-flex border-bottom border-1 border-dark py-2">
                <Col> { tour.date } </Col>
                <Col> { tour.location } </Col>
                <Col> { tour.venue } </Col>
                <Col>
                  <Button className = "shadow" variant = "outline-info" onClick = { submitHandler }> Buy Tickets </Button>
                </Col>
              </Row>
            )
          )
        }
        
      </Container>

    </>
  )
}

export default Home;