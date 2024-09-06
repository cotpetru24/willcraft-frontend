import axios from 'axios';
const API_PAYMENT_INTENT_URL = '/api/payments/create-payment-intent';
const API_PAYMENT_URL = '/api/payments';


export const createPaymentIntent = async (products, token) => {
  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  };
  try {
    const response = await axios.post(API_PAYMENT_INTENT_URL,
      products,
      config
    );
    return response.data
  } catch (error) {
    console.error("Error fetching client secret:", error);
  }
};


export const createPayment = async (paymentData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  };
  try {
    const response = await axios.post(API_PAYMENT_URL,
      paymentData,
      config
    );
    return response.data
  } catch (error) {
    console.error("Error fetching creating payment:", error);
  }
};

