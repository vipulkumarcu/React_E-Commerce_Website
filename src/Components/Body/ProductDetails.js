import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ItemContext from "../../Context/item-context";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function ProductDetails() {
  const { productId } = useParams();
  const context = useContext(ItemContext);
  const product = context.productsArr.find(prod => prod.title === productId);

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("https://react-movies-demo-d927f-default-rtdb.firebaseio.com/product-reviews.json");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        
        if (data && typeof data === 'object') {
          // Convert object to array and filter by productId
          const reviewsArray = Object.values(data).filter(info => info.productTitle === productId);
          setReviews(reviewsArray);
        } else {
          setReviews([]); // Ensure reviews is an empty array if data is not in expected format
        }
      } catch (error) {
        setError(error.message);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [productId]);

  async function addReviewHandler(e) {
    e.preventDefault();
  
    // Prepare the review data
    const reviewData = {
      productTitle: productId,
      review: newReview,
    };
  
    try {
      const response = await fetch("https://react-movies-demo-d927f-default-rtdb.firebaseio.com/product-reviews.json", {
        method: "POST",
        body: JSON.stringify(reviewData),
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
  
      // Optionally: Refresh reviews after successful submission
      const result = await response.json();
      console.log("New review submitted:", result);
      setNewReview(""); // Clear input after submission

      // Fetch reviews again to update the list
      const fetchReviews = async () => {
        try {
          const response = await fetch("https://react-movies-demo-d927f-default-rtdb.firebaseio.com/product-reviews.json");
          if (!response.ok) {
            throw new Error("Failed to fetch reviews");
          }
          const data = await response.json();
          
          if (data && typeof data === 'object') {
            const reviewsArray = Object.values(data).filter(info => info.productTitle === productId);
            setReviews(reviewsArray);
          } else {
            setReviews([]);
          }
        } catch (error) {
          setError(error.message);
          setReviews([]);
        }
      };

      await fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  }
  
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <h1>{product.title}</h1>
            <img src={product.imageUrl} alt={product.title} style={{ width: "100%" }} />
            <p>Price: ${product.price}</p>
            <Button variant="warning" onClick={() => context.addItemToCart(product)}>Add To Cart</Button>
          </Col>
          <Col>
            <h2>Reviews</h2>
            {loading && <p>Loading reviews...</p>}
            {error && <p>Error: {error}</p>}
            {reviews.length === 0 && !loading && !error && <p>No reviews found.</p>}
            {reviews.map((review, index) => (
              <p key={index}>{review.review}</p> // Ensure rendering the review content properly
            ))}
            <Form onSubmit={addReviewHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Add a review</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                />
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ProductDetails;