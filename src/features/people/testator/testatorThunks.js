import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrderThunk } from "../../currentOrder/currentOrderSlice";
import peopleService from "../peopleService";
import constants from "../../../common/constants";


export const createTestatorThunk = createAsyncThunk(
    'people/createTestator',
    async (testatorData, thunkApi) => {

        const userId = thunkApi.getState().auth.user._id;
        const updatedTestatorData = { ...testatorData, userId };

        try {
            const token = thunkApi.getState().auth.user.token;
            const createTestatorResponse = await peopleService.createPerson(updatedTestatorData, token);

            //create a new order if there is no orderId
            const orderId = thunkApi.getState().currentOrder.orderId;
            if (!orderId) {
                const orderData = {
                    peopleAndRoles: [{ personId: createTestatorResponse._id, role: [constants.role.TESTATOR] }],
                };
                const createNewOrderResponse = await thunkApi.dispatch(createOrderThunk(orderData)).unwrap();

                return { ...createTestatorResponse, orderId: createNewOrderResponse._id };

            } else {
                return createTestatorResponse;
            }
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


export const updateTestatorThunk = createAsyncThunk(
    'people/updateTestator',
    async (testatorData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const updateTestatorResponse = await peopleService.updatePerson(testatorData, token);

            return updateTestatorResponse;
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const testatorThunks = {
    createTestatorThunk,
    updateTestatorThunk
}

export default testatorThunks;
