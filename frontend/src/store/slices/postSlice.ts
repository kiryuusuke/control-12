import {createSlice} from "@reduxjs/toolkit";
import {Post} from "../../typesUI.ts";
import {getAllPosts} from "../thunks/postThunk.ts";

interface PostSliceState {
    posts: Post[];
    onePost: Post | null;
    isLoading: boolean;
    isError: boolean;
}

const initialState: PostSliceState = {
    posts: [],
    onePost: null,
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
    }
});

export const PostReducer = PostSlice.reducer;