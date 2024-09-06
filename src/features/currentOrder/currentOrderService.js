import axios from 'axios';
const API_ORDER_URL = '/api/orders/';


// Function to create a new order
// orderData: the data of the new order
// token: the authorization token for the API call
export const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.post(API_ORDER_URL, orderData, config);
  return response.data;
};


// Function to get an existing order by ID
// id: the ID of the order to retrieve
// token: the authorization token for the API call
export const getOrder = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(API_ORDER_URL + id, config);
  return response.data;
};


// Function to update an existing order
// orderData: the data of the order to be updated
// token: the authorization token for the API call
export const updateOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(API_ORDER_URL + orderData.orderId, orderData, config);
  return response.data;
};
