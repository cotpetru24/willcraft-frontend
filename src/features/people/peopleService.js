import axios from "axios";
const API_URL = 'https://willcraftbackend-o6fk58iq.b4a.run/api/people/';


export const createPerson = async (personData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, personData, config);

    return response.data;
}


export const updatePerson = async (personData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + personData._id, personData, config)

    return response.data;
}


export const deletePerson = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + id, config)

    return response.data;
}


const peopleService = { createPerson, updatePerson, deletePerson };

export default peopleService;
