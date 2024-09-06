import { createSlice } from "@reduxjs/toolkit";
import spouseOrPartnerThunks from "../spouseOrPartner/spouseOrPartnerThunks"

const initialState = {
    _id: '',
    title: '',
    fullLegalName: '',
    fullAddress: '',
    dob: '',
    email: '',
    tel: '',
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};


const spouseOrPartnerSlice = createSlice({
    name: 'spouseOrPartner',
    initialState,
    reducers: {
        updateSpouseOrPartnerSlice: (state, action) => {
            const { _id, title, fullLegalName, fullAddress, dob, email, tel } = action.payload;
            state._id = _id;
            state.title = title;
            state.fullLegalName = fullLegalName;
            state.fullAddress = fullAddress;
            state.dob = dob;
            state.email = email || '';
            state.tel = tel || '';
        },
        resetSpouseOrPartnerSlice: (state) => initialState,
    },
    extraReducers: (builder) => {

        builder

            //create SpouseOrPartner cases 
            .addCase(spouseOrPartnerThunks.createSpouseOrPartnerThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(spouseOrPartnerThunks.createSpouseOrPartnerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                const { _id, title, fullLegalName, fullAddress, dob, email, tel } = action.payload;
                state._id = _id;
                state.title = title;
                state.fullLegalName = fullLegalName;
                state.fullAddress = fullAddress;
                state.dob = dob;
                state.email = email || '';
                state.tel = tel || '';
            })
            .addCase(spouseOrPartnerThunks.createSpouseOrPartnerThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


            //Update SpouseOrPartner cases
            .addCase(spouseOrPartnerThunks.updateSpouseOrPartnerThunk.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(spouseOrPartnerThunks.updateSpouseOrPartnerThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;

                const { _id, title, fullLegalName, fullAddress, dob, email, tel } = action.payload;
                state._id = _id;
                state.title = title;
                state.fullLegalName = fullLegalName;
                state.fullAddress = fullAddress;
                state.dob = dob;
                state.email = email || '';
                state.tel = tel || '';
            })
            .addCase(spouseOrPartnerThunks.updateSpouseOrPartnerThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});


export const {
    updateSpouseOrPartnerSlice,
    resetSpouseOrPartnerSlice
} = spouseOrPartnerSlice.actions;

export default spouseOrPartnerSlice.reducer;

