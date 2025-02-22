import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getAllPosts} from "../../store/thunks/postThunk.ts";
import {Box, Grid2} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import PostItem from "./PostItem.tsx";

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.posts.posts);
    const loading = useAppSelector((state) => state.posts.isLoading);

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch]);

    return (
        <Box>
            {loading ? <Spinner/>
                :
                <Grid2 container spacing={2} justifyContent="center">
                    {posts.map((post) => (
                        <Grid2 key={post._id} >
                            <PostItem posts={post}/>
                        </Grid2>
                    ))}
                </Grid2>
            }
        </Box>
    );
};

export default Posts;