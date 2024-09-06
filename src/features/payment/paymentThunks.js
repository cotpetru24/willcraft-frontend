import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createPaymentIntent, createPayment } from "./paymentService";


export const createPaymentIntentThunk = createAsyncThunk(
    'payments/createPaymentIntentThunk',
    async (products, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await createPaymentIntent(products, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const createPaymentThunk = createAsyncThunk(
    'payments/createPayment',
    async (paymentData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await createPayment(paymentData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

