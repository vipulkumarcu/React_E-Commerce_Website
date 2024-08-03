import { useState, useRef, useContext } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import ItemContext from "../../Context/item-context";
import { useNavigate } from "react-router-dom";

function Login ()
{
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const navigate = useNavigate ();

  const context = useContext ( ItemContext );

  const [ error, setError ] = useState ( null );
  const [ isLoading, setIsLoading ] = useState ( false );

  async function submitHandler ( event )
  {
    event.preventDefault ();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    setIsLoading ( ( prev ) => !prev );
    setError ( null );

    try
    {
      const response = await fetch ( "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5ApYd3RgMAOvajwlihgrBlcINM_ix2TE",
        {
          method: "POST",
          body: JSON.stringify (
            {
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }
          ),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json ();

      if ( !response.ok )
      {
        throw new Error ( data.error.message || "Failed to authenticate." );
      }

      context.loginHandler ( data.idToken );

      navigate ( "/store" );
    }
    
    catch ( error )
    {
      setError ( error.message );
    }

    setIsLoading ( ( prev ) => !prev );
  }

  return (
    <Form onSubmit = { submitHandler }>

      {
        error && <Alert variant = "danger"> { error } </Alert>
      }

      { 
        isLoading && <Alert variant = "info"> Loggin In... </Alert>
      }

      <Form.Floating className = "mb-3">
        <Form.Control size="lg" id = "floatingInputCustom" type = "email" ref = { inputEmailRef } placeholder = "Enter your email" required/>
        <label htmlFor = "floatingInputCustom"> Email address </label>
      </Form.Floating>

      <Form.Floating className = "mb-3">
        <Form.Control size="lg" id = "floatingInputCustom" type = "password" ref = { inputPasswordRef } placeholder = "Enter your password" required/>
        <label htmlFor = "floatingInputCustom"> Password </label>
      </Form.Floating>
      
      {/* <Form.Group className = "mb-3" controlId = "formBasicCheckbox">
        <Form.Check type = "checkbox" label = "Keep me Logged In" />
      </Form.Group> */}
      
      <Button variant = "outline-primary" type = "submit" disabled = { isLoading }>
        Login
      </Button>

    </Form>
  )
}

export default Login;