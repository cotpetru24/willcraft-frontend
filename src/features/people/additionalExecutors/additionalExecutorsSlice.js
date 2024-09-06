import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const additionalExecutorsSlice = createSlice({
  name: 'additionalExecutors',
  initialState,
  reducers: {
    updateAdditionalExecutorsSlice: (state, action) => {
      if (Array.isArray(action.payload)) {
        return action.payload;
      } else {
        state.push(action.payload);
      }
    },
    removeAdditionalExecutorSlice: (state, action) => {
      return state.filter(executor => executor._id !== action.payload);
    },

    resetAdditionalExecutorsSlice: (state) => initialState,
  },
});


export const {
  resetAdditionalExecutorsSlice: resetAdditionalExecutorsSlice,
  updateAdditionalExecutorsSlice: updateAdditionalExecutorsSlice,
  removeAdditionalExecutorSlice: removeAdditionalExecutorSlice
} = additionalExecutorsSlice.actions;


export default additionalExecutorsSlice.reducer;
