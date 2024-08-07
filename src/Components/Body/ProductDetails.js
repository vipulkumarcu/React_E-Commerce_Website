/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Modal, Alert, CloseButton } from "react-bootstrap";
import ItemContext from "../../Context/item-context";

function ProductDetails ()
{
  const { productId } = useParams ();
  const context = useContext ( ItemContext );
  const product = context.productsArr.find ( prod => prod.title === productId );
  const navigate = useNavigate ();

  const [ reviews, setReviews ] = useState ( [] );
  const [ newReview, setNewReview ] = useState ( "" );
  const [ loading, setLoading ] = useState ( true );
  const [ error, setError ] = useState ( null );
  const [ modalShow, setModalShow ] = useState ( false );
  const [ alertMessage, setAlertMessage ] = useState ( "" );
  const [ alertVariant, setAlertVariant ] = useState ( "danger" );

  async function fetchReviews ()
  {
    try
    {
      const response = await fetch ( "https://e-commerce-2a608-default-rtdb.firebaseio.com/product-reviews.json" );

      if ( !response.ok )
      {
        throw new Error ( "Failed to fetch reviews" );
      }

      const data = await response.json ();

      if ( data && typeof data === 'object' )
      {
        const reviewsArray = Object.values ( data ).filter ( info => info.productTitle === productId );
        setReviews ( reviewsArray );
      }
      
      else
      {
        setReviews ( [] );
      }
    }
    
    catch ( error )
    {
      setError ( error.message );
      setReviews ( [] );
    }
    
    finally
    {
      setLoading ( false );
    }
  }

  useEffect (
    () => {
      fetchReviews ();
    }, [ productId ]
  );

  async function addReviewHandler ( e )
  {
    e.preventDefault ();

    if ( !newReview || !isNaN ( newReview ) )
    {
      setAlertMessage ( "Please enter a valid review to submit." );
      setAlertVariant ( "danger" );
      return;
    }

    const reviewData = {
      productTitle: productId,
      review: newReview,
    };

    try
    {
      const response = await fetch ( "https://e-commerce-2a608-default-rtdb.firebaseio.com/product-reviews.json",
        {
          method: "POST",
          body: JSON.stringify ( reviewData ),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if ( !response.ok )
      {
        throw new Error ( "Failed to submit review" );
      }

      setNewReview ( "" );
      await fetchReviews ();

    }
    
    catch ( error )
    {
      console.error ( "Error submitting review:", error );
    }
  }

  return (

    <Container>

      <Button className = "shadow" variant = "secondary" onClick = { () => navigate ( "/store" ) } style=  { { marginBottom: "20px" } }>
        Back to Products        
      </Button>

      <Row>

        <Col md = { 6 } style = { { textAlign: "center" } } >
          <h1> { product.title } </h1>
          <img class = "shadow-lg p-3" src = { product.imageUrl } alt = { product.title } style = { { width: "80%", maxWidth: "300px", margin: "auto", backgroundColor: "#C0C0C0" } } onClick = { () => setModalShow ( true ) } />
          <Modal show = { modalShow } onHide = { () => setModalShow ( false ) } size = "lg" centered >
              <Modal.Body>
                <img src = { product.imageUrl } alt = { product.title } style = { { width: "100%", height: "auto" } } />
              </Modal.Body>
            </Modal>
          <p> Price: $ { product.price } </p>
          <Button className = "shadow-lg" variant = "warning" onClick = { () => context.addItemToCart ( product ) } > Add To Cart </Button>
        </Col>

        <Col md = { 6 }>
        
          <h2> Reviews </h2>

          <div class="shadow" style={{ maxHeight: "300px", overflowY: "scroll", border: "1px solid #ddd", padding: "10px", borderRadius: "5px", marginBottom: "20px", backgroundColor: "#A9A9A9" }}>

            { loading && <p> Loading reviews... </p> }

            { error && <p> Error: { error } </p> }

            {
              reviews.length === 0 && !loading && !error && 
              <div class = "shadow" style = { { border: "1px solid #ddd", borderRadius: "4px", padding: "10px", marginBottom: "10px", backgroundColor: "#D3D3D3" } }>
                <p> No reviews found. </p>
              </div> 
            }

            {
              reviews.map ( ( review, index ) =>
                (
                  <div class = "shadow" key = { index } style = { { border: "1px solid #ddd", borderRadius: "4px", padding: "10px", marginBottom: "10px", backgroundColor: "#D3D3D3" } } >
                    <p> { review.review } </p>
                  </div>
                )
              )
            }

          </div>

          {
            alertMessage && 
            (
              <Alert variant = { alertVariant } onClose = { () => setAlertMessage ( "" ) } dismissible >
                { alertMessage }
              </Alert>
            )
          }

          <Form onSubmit = { addReviewHandler }>

            <Form.Group className = "mb-3">
              <Form.Label> <b> Add a review </b> </Form.Label>
                <Form.Control className = "shadow" as = "textarea" rows = { 3 } value = { newReview } onChange = { (e) => setNewReview ( e.target.value ) } />
            </Form.Group>

            <Button className = "shadow-lg" type = "submit" variant = "success"> Submit </Button>

          </Form>

        </Col>

      </Row>

    </Container>
  );
}

export default ProductDetails;