import axios from "axios";
const API_URL_ALL = 'https://willcraftbackend-o6fk58iq.b4a.run/api/reviews/';
const API_URL = 'https://willcraftbackend-o6fk58iq.b4a.run/api/reviews/latest';


export const createReview = async (reviewData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL_ALL, reviewData, config);

    return response.data;
}


export const getAllReviews = async () => {
    const response = await axios.get(API_URL_ALL)

    return response.data
}


export const getLast3Reviews = async () => {
    const response = await axios.get(API_URL)

    return response.data
}


const reviewsService = { createReview, getAllReviews, getLast3Reviews };

export default reviewsService;
