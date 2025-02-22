import {createSlice} from "@reduxjs/toolkit";
import {Post} from "../../typesUI.ts";
import {adminDelete} from "./AdminPostThunk.ts";

interface AdminPostSliceState {
    posts: Post[],
    isLoading: boolean,
    isError: boolean
}

const initialState: AdminPostSliceState = {
    posts: [],
    isLoading: false,
    isError: false
}

const AdminPostSlice = createSlice({
    name: 'admin/posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                adminDelete.pending, (state) => {
                    state.isLoading = true;
                    state.isError = false
                }
            )
            .addCase(
                adminDelete.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.posts = state.posts.filter((post) => post._id !== action.meta.arg);
                }
            )
            .addCase(
                adminDelete.rejected, (state) => {
                    state.isLoading = false;
                    state.isError = true;
                }
            )
    }
});

export const AdminPostReducer = AdminPostSlice.reducer;