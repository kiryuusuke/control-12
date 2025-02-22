import express from "express";
import Post from "../models/Post";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import {PostTypes} from "../typesApi";
import permit from "../middleware/permit";

export const postRouter = express.Router();

postRouter.get('/', async(req, res, next) => {
    try {
        const {userId} = req.query;
        if(userId) {
             res.status(200).send(await Post.find({author: userId}));
             return
        }
        const response = await Post.find();
        res.status(200).send(response);
    } catch(e) {
        next(e)
    }
});

postRouter.get('/:id', async(req, res, next) => {
    const {id} = req.params;
    try {
        if(!id) {
            res.status(404).send({message: 'Not Found!'});
            return
        }
        const post = await Post.findById(id);
        res.status(200).send(post);
    } catch(e) {
        next(e)
    }
});

postRouter.get('/:userId/userpage', async(req, res, next) => {
    try {
        const {userId} = req.params;
        if (!userId) {
           res.status(404).send({message: 'User not found'});
        }
        const author = await Post.find({author: userId});
        res.status(200).send(author);
    } catch(e) {
        next(e)
    }
});


postRouter.post('/', imagesUpload.single("photo"), auth, async(req, res, next) => {
    let expressReq = req as RequestWithUser;
    const user = expressReq.user;

    const newPost: PostTypes = {
        title: req.body.title,
        author: String(user._id),
        photo: req.file ? 'images/' + req.file.filename : null,
    };
    try {
        const post = new Post(newPost);
        await post.save();
        res.status(200).send(post);
    } catch(e) {
        next(e)
    }
});

postRouter.delete('/:userId', auth, async (req, res, next) => {
    try {
        let expressReq = req as RequestWithUser;
        const user = expressReq.user;
        const { userId } = req.params;
        const { postId } = req.query;

        if (!userId) {
            res.status(404).send({message: 'User not found'});
            return
        }

        if (!postId) {
            res.status(400).send({message: 'Post id not found'});
            return
        }

        const post = await Post.findById(postId);

        if (!post) {
            res.status(404).send({message: 'Post not found'});
            return
        }

        if (post.author.toString() !== user._id.toString()) {
            res.status(403).send({message: 'You can only delete your own posts'});
            return
        }

        await Post.findByIdAndDelete(postId);
        res.status(200).send({message: 'Post deleted successfully'});
    } catch (e) {
        next(e);
    }
});
