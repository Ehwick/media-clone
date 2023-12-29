import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */

// will have imaged passed in, per main index.js file
export const createPost = async (req, res) => {
    try {
        // extract info from front end pic having used upload function 
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId, 
            firstName: user.firstName,
            lastName: user.lastName, 
            location: user.location, 
            description,
            userPicturePath: user.picturePath,
            picturePath,
            // empty likes at first
            likes: {},
            comments: []
        })
        await newPost.save();
        // after saving post, grab ALL posts to return to front end
        const post = await Post.find();
        res.status(201).json(post);

    } catch (err) {
        res.status(409).json({ message: err.message })
    }
};

/* READ */

export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        // will get posts of the user 
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

/* UPDATE */

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { likes: post.likes},
            { new: true }
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// backend is now complete!