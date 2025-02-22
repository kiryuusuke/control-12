import React from 'react';
import {BASE_URL} from "../../globalConstants.ts";
import {NavLink} from "react-router-dom";
import {Box, Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Post} from "../../typesUI.ts";

interface Props {
    posts: Post;
}

const PostItem: React.FC<Props> = ({posts}) => {
    return (
        <>
            <NavLink to={`/posts/${posts._id}`} style={{ textDecoration: 'none' }}>
                <Box
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
                            <Typography variant="body2" color="textSecondary">
                                Author: {posts.author.displayName}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </NavLink>
        </>
    );
};

export default PostItem;