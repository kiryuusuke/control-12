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

export const getUserPage = createAsyncThunk<Post[], string>(
    'posts/getUserPage',
    async(userId) => {
        const response = await axiosApi.get(`/posts/${userId}/userpage`);
        return response.data || []
    }
)

export const deletePost = createAsyncThunk<void, { userId: string; postId: string }, {state: RootState}>(
    'posts/deletePost',
    async({ userId, postId }, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.delete(`/posts/${userId}?postId=${postId}`, {
            headers: {Authorization: token}
        });

    }
)