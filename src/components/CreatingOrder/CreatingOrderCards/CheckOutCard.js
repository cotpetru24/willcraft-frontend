import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createPaymentIntentThunk, createPaymentThunk } from "../../../features/payment/paymentThunks";
import { updateOrderThunk } from "../../../features/currentOrder/currentOrderSlice";
import LoadingSpinner from "../../LoadingSpinner";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_FRONTEND_SECRET);


const CheckOutCard = ({ setShowCheckout, clientSecret, products, totalAmount, addStorage, setAddStorage, addPrinting, setAddPrinting }) => {

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentOrder = useSelector((state) => state.currentOrder);
  const userId = useSelector((state) => state.auth.user._id);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });

      if (error) {
        setError(`Payment failed: ${error.message}`);
        setIsProcessing(false);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Prepare the payment data for dispatch
        const paymentData = {
          orderId: currentOrder.orderId,
          userId: userId,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
          paymentDate: new Date(paymentIntent.created * 1000),
          paymentMethod: paymentIntent.payment_method_types[0],
          products: products,
        };

        await dispatch(createPaymentThunk(paymentData)).unwrap();
        await dispatch(
          updateOrderThunk({
            ...currentOrder,
            status: "complete",
            completionDate: new Date(),
          })
        );

        // Handle successful payment
        setError(null);
        setIsProcessing(false);
        setTimeout(() => {
          setShowCheckout(false);
        }, 1000);
        toast.success("Payment successfully made!");
      }
    } catch (err) {
      console.error("Payment error: ", err);
      setError(`Payment failed: ${err.message}`);
      setIsProcessing(false);
    }
  };


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      <Container className="mb-5">
        <Card className="shadow" bg="light" text="dark">
          <Card.Body>
            <Card.Title>
              <Row>
                <Col xs={10}>
                  <h2>Checkout</h2>
                </Col>
              </Row>
            </Card.Title>

            {/* Order breakdown/products */}
            <Card.Text as="div">
              {products.map((product, index) => (
                <Row key={index} className="d-flex justify-content-between">
                  <Col>
                    <p>1x {product.name}</p>
                  </Col>
                  <Col className="text-end">
                    <p>£{product.price.toFixed(2)}</p>
                  </Col>
                </Row>
              ))}
              <Row className="d-flex justify-content-end">
                <Col className="text-end">
                  <strong>Total: £{totalAmount.toFixed(2)}</strong>
                </Col>
              </Row>
            </Card.Text>

            <Card.Text as="div">
              <Row>
                <Col>
                  <Form onSubmit={handleSubmit}>
                    {/* Checkboxes for additional products */}
                    <Form.Group className="mb-3" controlId="formGroupAddOns">
                      <Form.Check
                        type="checkbox"
                        label="Add Storage"
                        checked={addStorage}
                        onChange={() => setAddStorage(!addStorage)}
                      />
                      <Form.Check
                        type="checkbox"
                        label="Add Printing"
                        checked={addPrinting}
                        onChange={() => setAddPrinting(!addPrinting)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formGroupCardDetails"
                    >
                      <Form.Label className="bold-label">Card Details</Form.Label>
                      <PaymentElement />
                    </Form.Group>
                    <Row>
                      <Col className="d-flex justify-content-between">
                        <Button
                          variant="warning"
                          className="creating-order-tile-btns"
                          onClick={() => setShowCheckout(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="primary"
                          className="creating-order-tile-btns"
                          type="submit"
                          disabled={!stripe || isProcessing}
                        >
                          {isProcessing ? "Processing..." : "Pay"}
                        </Button>
                      </Col>
                    </Row>
                    {error && <div>{error}</div>}
                  </Form>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};


const PaymentPage = ({ setShowCheckout }) => {

  const [clientSecret, setClientSecret] = useState(null);
  const [fetchingIntent, setFetchingIntent] = useState(false);
  const [addStorage, setAddStorage] = useState(false);
  const [addPrinting, setAddPrinting] = useState(false);
  const dispatch = useDispatch();

  const baseProduct = { name: "Standard will", price: 20 };
  const storageProduct = { name: "Storage", price: 25 };
  const printingProduct = { name: "Printing", price: 10 };

  const products = [
    baseProduct,
    ...(addStorage ? [storageProduct] : []),
    ...(addPrinting ? [printingProduct] : []),
  ];

  const totalAmount = products.reduce((acc, product) => acc + product.price, 0);

  useEffect(() => {

    const fetchClientSecret = async () => {
      setFetchingIntent(true)
      const productsData = { products };
      try {
        const paymentIntentResponse = await dispatch(
          createPaymentIntentThunk(productsData)
        ).unwrap();
        setClientSecret(paymentIntentResponse.clientSecret);
        setFetchingIntent(false)
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    fetchClientSecret();
  }, [dispatch, addStorage, addPrinting]);


  return (
    <>
      {fetchingIntent ? (
        <LoadingSpinner />
      ) : (
        clientSecret && (
          <Elements key={clientSecret} stripe={stripePromise} options={{ clientSecret }}>
            <CheckOutCard
              setShowCheckout={setShowCheckout}
              clientSecret={clientSecret}
              products={products}
              totalAmount={totalAmount}
              addStorage={addStorage}
              setAddStorage={setAddStorage}
              addPrinting={addPrinting}
              setAddPrinting={setAddPrinting}
            />
          </Elements>
        )
      )}
    </>
  );
};


export default PaymentPage;

