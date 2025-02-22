import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import axiosApi from "../../axiosApi.ts";

export const adminDelete = createAsyncThunk<void, string, {state: RootState}>(
    '/admin/posts/adminDelete',
    async(postId, {getState}) => {
        try {
            const token = getState().users.user?.token;
            await axiosApi.delete(`/admin/posts/${postId}`, {
                headers: {Authorization: token}
            })
        } catch(e) {
            console.error(e)
        }
    }
)