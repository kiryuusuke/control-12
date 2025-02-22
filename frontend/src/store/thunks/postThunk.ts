import {createAsyncThunk} from "@reduxjs/toolkit";
import {Post} from "../../typesUI.ts";
import axiosApi from "../../axiosApi.ts";

export const getAllPosts = createAsyncThunk<Post[], void>(
    'posts/getAllPosts',
    async() => {
        const response = await axiosApi.get('/posts');
        return response.data || []
    }
);