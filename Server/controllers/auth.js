// controller functions regarding authorization 

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// register function 
export const register = async (req, res) => {
    try {
        // destructure values from register form
        const {
            firstName,
            lastName, 
            email, 
            password,
            picturePath, 
            friends, 
            location, 
            occupation
        } = req.body;

        // use Bcrypt to hash password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // create new user object using values and model
        const newUser = new User({
            firstName,
            lastName, 
            email, 
            password: passwordHash,
            picturePath, 
            friends, 
            location, 
            occupation, 
            // generate random numbers for demo purposes
            viewedProfile: Math.floor(Math.random() * 10000),
            viewedProfile: Math.floor(Math.random() * 10000)
        });
        const savedUser =  await newUser.save();

        // send new user back with 201 (something has been created)
        res.status(201).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// login function 
export const login = async (req, res) => {
    try {
        // destructure email and password from req.body
        const { email, password } = req.body;
        // logic for finding corresponding user 
        const user = await User.findOne({ email: email });
        if (!user) {
            console.error('User not found:', email);
            return res.status(400).json({ msg: "User does not exist. " });
        }
        // logic to compare input password and user password
        console.log('Input password:', password);
        console.log('Database password:', user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Password not match');
            return res.status(400).json({ msg: "Invalid credentials. " });
        }

        // give user token since passwords match
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        // delete password so it doesn't get sent back to front end
        delete user.password;
        res.status(200).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}