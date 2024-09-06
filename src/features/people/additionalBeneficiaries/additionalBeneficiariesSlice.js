import { createSlice } from "@reduxjs/toolkit";

const initialState = [];


const additionalBeneficiariesSlice = createSlice({
    name: 'additionalBeneficiaries',
    initialState,
    reducers: {
        updateAdditionalBeneficiariesSlice: (state, action) => {
            if (Array.isArray(action.payload)) {
                return action.payload;
            } else {
                state.push(action.payload);
            }
        },
        resetAdditionalBeneficiariesSlice: () => initialState,
    }
});


export const {
    updateAdditionalBeneficiariesSlice,
    resetAdditionalBeneficiariesSlice
} = additionalBeneficiariesSlice.actions;

export default additionalBeneficiariesSlice.reducer;