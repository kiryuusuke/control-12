import express from "express";
import Post from "../../models/Post";

export const adminPostRouter = express.Router();

adminPostRouter.delete('/:id', async(req, res, next) => {
    const {id} = req.params;
    try {
        if(!id) {
            res.status(404).send({message: 'Post not found!'});
            return
        }
        await Post.findOneAndDelete({_id: id});
        res.status(200).send({message: 'Post was successfully deleted!'});
    } catch(e) {
        next(e)
    }
})