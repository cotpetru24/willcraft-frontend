import { createAsyncThunk } from "@reduxjs/toolkit";
import { createReview, getAllReviews, getLast3Reviews } from "./reviewService";


export const createReviewThunk = createAsyncThunk(
    'reviews/createReview',
    async (reviewData, thunkApi) => {

        try {
            const token = thunkApi.getState().auth.user.token;

            const createReviewResponse = await createReview(reviewData, token);

            return createReviewResponse;

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkApi.rejectWithValue(message);
        }
    }
);


export const getAllReviewsThunk = createAsyncThunk(
    'reviews/getAllReviews',
    async (thunkApi) => {
        try {
            const getAllReviewsResponse = await getAllReviews();

            return getAllReviewsResponse;

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkApi.rejectWithValue(message);
        }
    }
);


export const getLast3ReviewsThunk = createAsyncThunk(
    'reviews/getLast3Reviews',
    async (thunkApi) => {
        try {
            const getLast3ReviewsResponse = await getLast3Reviews();

            return getLast3ReviewsResponse;

        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkApi.rejectWithValue(message);
        }
    }
);


const reviewThunks = {
    createReviewThunk,
    getAllReviewsThunk,
    getLast3ReviewsThunk
}

export default reviewThunks;
