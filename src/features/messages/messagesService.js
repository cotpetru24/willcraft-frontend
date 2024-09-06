import axios from "axios";
const API_URL = 'https://willcraftbackend-o6fk58iq.b4a.run/api/messages/';


export const createMessage = async (messageData,) => {

    const response = await axios.post(API_URL, messageData);

    return response.data;
}


const messagesService = { createMessage };

export default messagesService;
