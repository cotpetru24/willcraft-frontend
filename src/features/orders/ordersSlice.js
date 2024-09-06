import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ordersService from "./ordersService";


const initialState = {
    orders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const getOrders = createAsyncThunk(
    'orders/getAllUserOrders',
    async (_, thunkAPI) => {

        try {
            const token = thunkAPI.getState().auth.user.token
            return await ordersService.getOrders(token)
        }
        catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const deleteOrder = createAsyncThunk(
    'orders/deleteOrder',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ordersService.deleteOrder(id, token)
        }
        catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        reset: state => initialState
    },
    extraReducers: (builder) => {
        builder

            //get all user's orders
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


            //delete a user's order
            .addCase(deleteOrder.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.orders = state.orders.filter(order => order._id !== action.payload.id)
            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const { reset } = ordersSlice.actions

export default ordersSlice.reducer