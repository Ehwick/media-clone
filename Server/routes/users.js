import express from "express";
// import user based controller functions
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
// get certain user / get certain user's friends
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */

// add / remove friend 
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;