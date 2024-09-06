import { createAsyncThunk } from "@reduxjs/toolkit";
import { createMessage } from "./messagesService";


export const createMessageThunk = createAsyncThunk(
    'messages/createMessage',

    async (messageData, thunkApi) => {

        // Get the user from the state
        const user = thunkApi.getState().auth.user;
        const userId = user ? user._id : null;

        // Include userId in messageData only if it exists
        const updatedMessageData = userId ? { ...messageData, userId } : messageData;


        try {
            const createMessageResponse = await createMessage(updatedMessageData);

            return createMessageResponse;

        } catch (error) {
            console.error('Error in createMessageThunk:', error);

            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            console.error('Returning error message:', message);

            return thunkApi.rejectWithValue(message);
        }
    }
);


const messagesThunks = {
    createMessageThunk
}

export default messagesThunks;
