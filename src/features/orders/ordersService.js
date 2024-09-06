import axios from "axios";
const API_URL = 'https://willcraftbackend-o6fk58iq.b4a.run/api/orders/';


const getOrders = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}


const deleteOrder = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + id, config)

    return response.data
}


const ordersService = { getOrders, deleteOrder }

export default ordersService
