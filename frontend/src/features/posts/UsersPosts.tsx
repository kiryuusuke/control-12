import {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getUserPosts} from "../../store/thunks/postThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import PostItem from "./PostItem.tsx";

const UsersPosts = () => {
    const location = useLocation();
    const userId = new URLSearchParams(location.search).get('userId');    const dispatch = useAppDispatch();
    const userPosts = useAppSelector((state) => state.posts.posts);
    const loading = useAppSelector((state) => state.posts.isLoading);

    useEffect(() => {
        if(userId === undefined) return

        if(!userId) {
            alert('User not found');
            return
        }
        dispatch(getUserPosts(userId));
    }, [dispatch, userId]);
    return (
        <>
            {loading ? <Spinner/>
            :
                <>
                    {userPosts.map((userPost) => (
                        <PostItem key={userPost._id} posts={userPost} />
                    ))}
                </>
            }
        </>
    );
};

export default UsersPosts;