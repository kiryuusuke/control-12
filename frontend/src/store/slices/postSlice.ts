import {createSlice} from "@reduxjs/toolkit";
import {Post} from "../../typesUI.ts";
import {deletePost, getAllPosts, getUserPage, getUserPosts} from "../thunks/postThunk.ts";

interface PostSliceState {
    posts: Post[];
    isLoading: boolean;
    isError: boolean;
}

const initialState: PostSliceState = {
    posts: [],
    isLoading: false,
    isError: false
}

const PostSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                getAllPosts.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getAllPosts.fulfilled, (state, {payload: posts}) => {
                    state.isLoading = false;
                    state.posts = posts
                }
            )
            .addCase(
                getAllPosts.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                getUserPosts.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false
                }
            )
            .addCase(
                getUserPosts.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.posts = action.payload
                }
            )
            .addCase(
                getUserPosts.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                getUserPage.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                getUserPage.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.posts = action.payload
                }
            )
            .addCase(
                getUserPage.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
            .addCase(
                deletePost.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false;
                }
            )
            .addCase(
                deletePost.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.posts = state.posts.filter((post) => post._id === action.meta.arg)
                }
            )
            .addCase(
                deletePost.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
    }
});

export const PostReducer = PostSlice.reducer;