import React, {useState} from 'react';
import {BASE_URL} from "../../globalConstants.ts";
import {Box, Card, CardContent, CardMedia, IconButton, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Post, User} from "../../typesUI.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {deletePost} from "../../store/thunks/postThunk.ts";
import {Link} from "react-router-dom";

interface Props {
    posts: Post;
    user?: User | null
}

const PostItem: React.FC<Props> = ({posts, user}) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDelete = () => {
        if (user && posts.author._id === user._id) {
            window.confirm('You want to delete this post?')
            dispatch(deletePost({ userId: user._id, postId: posts._id }))
            console.log('Post deleted successfully');
        } else {
            alert('You can only delete your own posts');
        }
    };

    return (
        <>
                <Box
                    onClick={handleOpen}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 250,
                        boxShadow: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <Card sx={{bgcolor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(15px)'}}>
                        {posts.photo && (
                            <CardMedia
                                component="img"
                                image={`${BASE_URL}/public/${posts.photo}`}
                                alt={posts.title}
                                sx={{
                                    height: 180,
                                    objectFit: 'cover',
                                }}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                {posts.title}
                            </Typography>
                            <Typography component={Link} to={`/posts/${posts.author._id}/userpage`} variant="body2" color="textSecondary">
                                Author: {posts.author.displayName}
                            </Typography>
                        </CardContent>
                        {user && posts.author._id === user._id && (
                            <IconButton onClick={handleDelete}>Delete</IconButton>
                        )}
                    </Card>
                </Box>


            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                    </IconButton>
                    <Typography id="post-modal-title" variant="h5" sx={{ mb: 2 }}>
                        {posts.title}
                    </Typography>
                    {posts.photo && (
                        <CardMedia
                            component="img"
                            image={`${BASE_URL}/public/${posts.photo}`}
                            alt={posts.title}
                            sx={{
                                height: 200,
                                objectFit: 'cover',
                                mb: 2,
                                borderRadius: 1,
                            }}
                        />
                    )}
                    <Typography component={Link} to={`/posts/${posts.author._id}/userpage`} variant="body2" color="textSecondary">
                        Author: {posts.author.displayName}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default PostItem;