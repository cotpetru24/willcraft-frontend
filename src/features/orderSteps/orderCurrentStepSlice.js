import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currentStep: 0,
};


const orderCurrentStepSlice = createSlice({
  name: 'currentOrderStep',
  initialState,
  reducers: {
    updateOrderCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetOrderCurrentStep: (state) => {
      state.currentStep = 0;
    }
  },
});


export const { updateOrderCurrentStep, resetOrderCurrentStep } = orderCurrentStepSlice.actions;

export default orderCurrentStepSlice.reducer;
