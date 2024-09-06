import axios from 'axios';
const API_URL = 'https://willcraftbackend-o6fk58iq.b4a.run/api/users/';
const API_URL_UPDATE_USER_DETAILS = 'https://willcraftbackend-o6fk58iq.b4a.run/api/users/updateUserDetails/';


const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}


const logout = () => localStorage.removeItem('user')


const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


export const updateUserDetails = async (userData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(API_URL_UPDATE_USER_DETAILS + userData.userId, userData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const updateUserPassword = async (userData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    try {
        const response = await axios.put(API_URL + userData.userId, userData, config);
        return response.data;
    } catch (error) {
        throw error;
    }
}


const authService = { register, logout, login, updateUserPassword, updateUserDetails }

export default authService