import { createAsyncThunk } from "@reduxjs/toolkit";
import peopleService from "../peopleService";


export const createExecutorThunk = createAsyncThunk(
    'people/createKidThunk',
    async (executorData, thunkApi) => {

        const userId = thunkApi.getState().auth.user._id;
        const updatedExecutorData = { ...executorData, userId };

        try {
            const token = thunkApi.getState().auth.user.token;
            const createExecutorResponse = await peopleService.createPerson(updatedExecutorData, token);

            return createExecutorResponse
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


export const updateExecutorThunk = createAsyncThunk(
    'people/updateKidThunk',
    async (executorData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const updatedExecutorData = await peopleService.updatePerson(executorData, token);

            return updatedExecutorData;
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const executorsThunks = {
    createExecutorThunk,
    updateExecutorThunk
}


export default executorsThunks;
