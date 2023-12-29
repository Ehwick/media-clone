// controller functions regarding users 

import User from "../models/User.js";

/* READ */

export const getUser = async (req, res) => {
    try {
        // grab id from req 
        const { id } = req.params;
        const user = await User.findById(id);
        // send user object as res
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// get user friends based on specified id
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        // from here want to grab friends of the user 
        // will need to make multiple API calls to db
        // hence why Promise.all
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

/* UPDATE */

export const addRemoveFriend = async (req, res) => {
    try {
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
            console.log(id);
            console.log(friendId); 
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id)) 
        );
        // format friends for frontend
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        // send formatted friends in a json response
        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}