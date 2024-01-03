import express from "express";
// import post controller functions
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router(); 

/* READ POSTS */
// grab user feed when on homepage, won't be as curated
router.get("/", verifyToken, getFeedPosts);
// grab posts of userId user 
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE POSTS */
// like and unlike posts
router.patch("/:id/like", verifyToken, likePost);

export default router;