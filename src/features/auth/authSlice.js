import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';


const localuser = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: localuser ? localuser : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};


export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        try {
            return await authService.register(user)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }
)


export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        await authService.logout()
    }
)


export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        try {
            return await authService.login(user)
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    }

)


export const updateUserDetailsThunk = createAsyncThunk(
    'auth/updateUserDetails',
    async (userData, thunkAPI) => {

        const userId = thunkAPI.getState().auth.user._id;
        const updatedUserData = { ...userData, userId };

        try {
            const token = thunkAPI.getState().auth.user.token;
            const response = await authService.updateUserDetails(updatedUserData, token);
            return response;
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const updateUserPasswordThunk = createAsyncThunk(
    'auth/updateUserPassword',
    async (userData, thunkAPI) => {

        const userId = thunkAPI.getState().auth.user._id;
        const updatedUserData = { ...userData, userId };

        try {
            const token = thunkAPI.getState().auth.user.token;
            const response = await authService.updateUserPassword(updatedUserData, token);
            return response;
        }
        catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers: {
        reset: state => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },

    extraReducers: builder => {
        builder

            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = action.payload
                state.user = null
            })


            .addCase(logout.fulfilled, (state) => {
                state.user = null
                localStorage.clear();
            })


            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })


            .addCase(updateUserDetailsThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserDetailsThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUserDetailsThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })


            .addCase(updateUserPasswordThunk.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserPasswordThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUserPasswordThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
});


export const { reset } = authSlice.actions;

export default authSlice.reducer;