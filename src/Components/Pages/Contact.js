import { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";

function Contact ( props )
{
  const [ name, setName ] = useState ( "" );
  const [ email, setEmail ] = useState ( "" );
  const [ phone, setPhone ] = useState ( "" );
  const [ query, setQuery ] = useState ( "" );
  const [ alertMessage, setAlertMessage ] = useState ( "" );
  const [ alertVariant, setAlertVariant ] = useState ( "danger" );

  async function onSubmitHandler ( event )
  {
    event.preventDefault ();

    if ( !name || !email || isNaN ( phone ) || !query )
    {
      setAlertMessage ( "Please enter the correct details." );
      setAlertVariant ( "danger" );
      return;
    }

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
      setAlertMessage ( "Your query is submitted. We will contact you soon..." );
      setAlertVariant ( "success" );
      setName ( "" );
      setEmail ( "" );
      setPhone ( "" );
      setQuery ( "" );
    }
    
    else
    {
      setAlertMessage ( "Failed to submit query." );
      setAlertVariant ( "danger" );
    }
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

      <Form onSubmit = { onSubmitHandler } >

        <Form.Floating className = "mb-3">
          <Form.Control id = "floatingInputCustom" type= "text" value = { name } onChange = { ( e ) => ( setName ( e.target.value ) ) } placeholder = "Enter your name" />
          <label htmlFor = "floatingInputCustom"> Name </label>
        </Form.Floating>

        <Form.Floating className = "mb-3">
          <Form.Control id = "floatingInputCustom" type = "email" value = { email } onChange = { ( e ) => ( setEmail ( e.target.value ) ) } placeholder = "Enter your email" />
          <label htmlFor = "floatingInputCustom"> Email address </label>
        </Form.Floating>

        <Form.Floating className = "mb-3">
          <Form.Control id = "floatingInputCustom" type = "text" value = { phone } onChange = { ( e ) => ( setPhone ( e.target.value ) ) } placeholder = "Enter your phone number" />
          <label htmlFor = "floatingInputCustom"> Contact Number </label>
        </Form.Floating>

        <Form.Floating className = "mb-3">
          <Form.Control id = "floatingInputCustom" as = "textarea" rows = { 3 } value = { query } onChange = { ( e ) => ( setQuery ( e.target.value ) ) } placeholder = "Enter your query here" style = { { height: "100px" } } />
          <label htmlFor = "floatingInputCustom"> Query </label>
        </Form.Floating>

        <Button type = "submit" variant = "outline-primary"> Contact </Button>

      </Form>

    </>
  )
}

export default Contact;