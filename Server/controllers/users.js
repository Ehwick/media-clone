// controller functions regarding users 

import User from "../models/User.js";

// get user function
export const getUser = async (req, res) => {
    try {
        // grab id from req and return user with it
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// get user friends functions
export const getUserFriends = async (req, res) => {
    try {
        // find user's friends list
        const { id } = req.params;
        const user = await User.findById(id);
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) 
        );
        // format friends for frontend
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// add / remove friend
export const addRemoveFriend = async (req, res) => {
    try {
        // find user and friend by given id's
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            // removes friend from array 
            user.friends = user.friends.filter((id) => id !== friendId);
            // remove yourself from their friends list
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else {
            // add each other as friends
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        // get new friends list, format, and return 
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) 
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}