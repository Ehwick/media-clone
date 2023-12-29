import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router(); 

/* READ */

// grab user feed when on homepage, won't be as curated
// with an algo, that'd be for production level  
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */

// liking and unliking posts
router.patch("/:id/like", verifyToken, likePost);

export default router;