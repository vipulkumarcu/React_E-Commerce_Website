import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Button, Form } from "react-bootstrap";

function Contact ( props )
{
  const [ name, setName ] = useState ( "" );
  const [ email, setEmail ] = useState ( "" );
  const [ phone, setPhone ] = useState ( "" );
  const [ query, setQuery ] = useState ( "" );

  async function onSubmitHandler ( event )
  {
    event.preventDefault ();

    const contact_query = {
      Name: name,
      Email: email,
      Phone: phone,
      Query: query,
    };

    const response = await fetch ( "https://react-movies-demo-d927f-default-rtdb.firebaseio.com/query.json",
      {
        method: "POST",
        body: JSON.stringify ( contact_query ),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if ( response.ok )
    {
      alert ( "Your Query is submitted. We will contact you soon..." );
      setName ( "" );
      setEmail ( "" );
      setPhone ( "" );
      setQuery ( "" );
    }
    
    else
    {
      alert ( 'Failed to submit query' );
    }
  }

  return (
    <>
      <Header />

      <Form onSubmit = { onSubmitHandler } >

        <Form.Group className = "mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Name </Form.Label>
          <Form.Control type= "text" value = { name } onChange = { ( e ) => ( setName ( e.target.value ) ) } />
        </Form.Group>

        <Form.Group className = "mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Email address </Form.Label>
          <Form.Control type = "email" value = { email } onChange = { ( e ) => ( setEmail ( e.target.value ) ) }/>
        </Form.Group>

        <Form.Group className = "mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label> Phone Number </Form.Label>
          <Form.Control type = "text" value = { phone } onChange = { ( e ) => ( setPhone ( e.target.value ) ) } />
        </Form.Group>

        <Form.Group className = "mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label> Query (If Any) </Form.Label>
          <Form.Control as = "textarea" rows = { 3 } value = { query } onChange = { ( e ) => ( setQuery ( e.target.value ) ) } />
        </Form.Group>

        <Button type = "submit"> Contact </Button>

      </Form>

      <Footer />
    </>
  )
}

export default Contact;
