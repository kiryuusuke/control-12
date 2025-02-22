import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    photo: {
        type: String,
        required: true,
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;