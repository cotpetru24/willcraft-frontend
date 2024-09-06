import axios from "axios";
const API_URL = '/api/assets/'


export const updateAsset = async (assetData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(API_URL + assetData._id, assetData, config)

    return response.data;
}


export const createAsset = async (assetData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, assetData, config);

    return response.data;
}


const orderAssetsService = { updateAsset, createAsset };

export default orderAssetsService;