import {createAsyncThunk} from "@reduxjs/toolkit";
import {Post} from "../../typesUI.ts";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../app/store.ts";

export const getAllPosts = createAsyncThunk<Post[], void>(
    'posts/getAllPosts',
    async() => {
        const response = await axiosApi.get('/posts');
        return response.data || []
    }
);

export const getUserPosts = createAsyncThunk<Post[], string, {state: RootState}>(
    'posts/getUserPosts',
    async(userId, {getState}) => {
        const token = getState().users.user?.token;
        const response = await axiosApi.get(`/posts?userId=${userId}`, {
            headers: {Authorization: token}
        });
        return response.data || []
    }
);