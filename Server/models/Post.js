// comments won't have their own functionality, just 
// to make things easier
import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        // check if userId exists in map, if so, boolean is true
        // reason not an array is because map is more efficient bc mongo 
        likes: {
            type: Map,
            of: Boolean, 
        }, 
        comments: {
            type: Array,
            default: [],
        }
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;