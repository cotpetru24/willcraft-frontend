import { createAsyncThunk } from "@reduxjs/toolkit";
import peopleService from "../peopleService";


export const createAdditionalBeficiaryThunk = createAsyncThunk(
    'people/createAdditionalBeficiaryThunk',
    async (additionalBeneficiaryData, thunkApi) => {

        const userId = thunkApi.getState().auth.user._id;
        const updatedAdditionalBeneficiaryData = { ...additionalBeneficiaryData, userId };

        try {
            const token = thunkApi.getState().auth.user.token;
            const createAdditionalBeficiaryResponse = await peopleService.createPerson(updatedAdditionalBeneficiaryData, token);

            return createAdditionalBeficiaryResponse
        }
        catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
            return thunkApi.rejectWithValue(message);
        }
    }
);


export const updateAdditionalBeficiaryThunk = createAsyncThunk(
    'people/updateAdditionalBeficiaryThunk',
    async (additionalBeneficiaryData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const updatedAdditionalBeneficiaryData = await peopleService.updatePerson(additionalBeneficiaryData, token);

            return updatedAdditionalBeneficiaryData;
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const deleteAdditionalBeficiaryThunk = createAsyncThunk(
    'people/deleteAdditionalBeficiaryThunk',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await peopleService.deletePerson(id, token)
        }
        catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
);


const additionalBeneficiaryThunks = {
    createAdditionalBeficiaryThunk,
    updateAdditionalBeficiaryThunk,
    deleteAdditionalBeficiaryThunk
}

export default additionalBeneficiaryThunks;
