import { useState, useRef, useContext } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import ItemContext from "../../Context/item-context";
import { useNavigate } from "react-router-dom";

function Authenticate ()
{
  const inputEmailRef = useRef ();
  const inputPasswordRef = useRef ();

  const navigate = useNavigate ();

  const context = useContext ( ItemContext );

  const [ error, setError ] = useState ( null );
  const [ isLoading, setIsLoading ] = useState ( false );
  const [ isLoginMode, setIsLoginMode ] = useState ( true );

  async function submitHandler ( event )
  {
    event.preventDefault ();
    setIsLoading ( true );
    setError ( null );

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    
    let url;

    try
    {
      if ( isLoginMode )
      {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5ApYd3RgMAOvajwlihgrBlcINM_ix2TE";
      }
      
      else
      {
        url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA5ApYd3RgMAOvajwlihgrBlcINM_ix2TE";
      }

      const response = await fetch ( url ,
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
        throw new Error ( data.error.message || "Failed to Authenticate." );
      }

      context.loginHandler ( data.idToken, data.email );

      navigate ( "/store" );
    }
    
    catch ( error )
    {
      setError ( error.message );
    }

    setIsLoading ( false );
  }

  return (
    <>
      <Form onSubmit = { submitHandler }>

        {
          error && <Alert variant = "danger" dismissible> { error } </Alert>
        }

        {
          isLoading && <Alert variant="info"> { isLoginMode ? 'Logging in...' : 'Signing up...' } </Alert>
        }

        <Form.Floating className = "shadow mb-3">
          <Form.Control size = "lg" id = "email" type = "email" ref = { inputEmailRef } placeholder = "Enter your email" required/>
          <label htmlFor = "floatingInputCustom"> Email address </label>
        </Form.Floating>

        <Form.Floating className = "shadow mb-3">
          <Form.Control size = "lg" id = "password" type = "password" ref = { inputPasswordRef } placeholder = "Enter your password" required/>
          <label htmlFor = "floatingInputCustom"> Password </label>
        </Form.Floating>
        
        <Button className = "shadow" variant = "outline-primary" type = "submit" disabled = { isLoading }>  
          { isLoginMode ? 'Login' : 'Signup' }
        </Button>

      </Form>

      <Container style = { { textAlign: "center", padding: "15px" } }>
        <Button className = "shadow" variant = "outline-primary" type = "submit" onClick = { () => setIsLoginMode ( prev => !prev ) } >
        { isLoginMode ? 'Create new account' : 'Login with existing account' }
        </Button>
      </Container>

    </>
  )
}

export default Authenticate;