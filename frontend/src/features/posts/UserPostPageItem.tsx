import React, {useState} from 'react';
import {BASE_URL} from "../../globalConstants.ts";
import {Box, Card, CardContent, CardMedia, IconButton, Modal} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Post} from "../../typesUI.ts";

interface Props {
    posts: Post;
}

const UserPostPageItem: React.FC<Props> = ({posts}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                        <Typography variant="body2" color="textSecondary">
                            Author: {posts.author.displayName}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            <Modal open={open} onClose={handleClose} aria-labelledby="post-modal-title">
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
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
                    <Typography variant="body2" color="textSecondary">
                        Author: {posts.author.displayName}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default UserPostPageItem;