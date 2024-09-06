import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const kidsSlice = createSlice({
    name: 'kids',
    initialState,
    reducers: {
        updateKidsSlice: (state, action) => {
            if (Array.isArray(action.payload)) {
                return action.payload;
            } else {
                state.push(action.payload);
            }
        },
        resetKidsSlice: (state) => initialState,
    }
});


export const {
    updateKidsSlice,
    resetKidsSlice
} = kidsSlice.actions;

export default kidsSlice.reducer;