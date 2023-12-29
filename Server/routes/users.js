import express from "express";
// import controllers
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// create read routes where we get information

/* READ */

// "some id", call database with that ~particular~ id
// query string will grab particular id
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */

// need particular user ID and particular friend ID
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;