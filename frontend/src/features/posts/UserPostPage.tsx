import {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getUserPage} from "../../store/thunks/postThunk.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import UserPostPageItem from "./UserPostPageItem.tsx";

const UserPostPage = () => {
    const {userId} = useParams();
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.posts.posts);
    const loading = useAppSelector((state) => state.posts.isLoading);

    useEffect(() => {
        if(!userId) {
            alert('User does not exist');
            return
        }
        dispatch(getUserPage(userId))
    }, [dispatch, userId]);

    return (
        <>
            {loading ? <Spinner />
            :
            <>
                {posts.map((post) => (
                    <>
                        <h2>Page: {post.author.displayName}</h2>
                    <UserPostPageItem key={post._id} posts={post} />
                    </>
                ))}
            </>
            }
        </>
    );
};

export default UserPostPage;