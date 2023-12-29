// controller functions for authorization 

// allow us to encrypt our pw
import bcrypt from "bcrypt";
// send user webtoken for authorization
import jwt from "jsonwebtoken";
// Import a user model created in a models folder
import User from "../models/User.js";

/* REGISTER USER USING REGISTER FUNCT */

// mongoDB is called asynchronously, like an API 
// req provides us w/ frontend request, and
// res is what we send back to the frontend
export const register = async (req, res) => {
    try {
        // structure the parameters within the brackets
        // using the request body 
        // frontend must send an object that has these parameters 
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

        console.log("destructured response body");

        // create random salt created with bcrypt
        // is used to encrypt our password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        console.log("hashed");

        // create new user object 
        // the way this will work is that we will encrypt the password 
        // save it, then after, when they try to log in, they will provide 
        // the password, we salt it, verify, provide jwt.
        const newUser = new User({
            firstName,
            lastName, 
            email, 
            password: passwordHash,
            picturePath, 
            friends, 
            location, 
            occupation, 
            // give random # 
            viewedProfile: Math.floor(Math.random() * 10000),
            viewedProfile: Math.floor(Math.random() * 10000)
        });

        console.log("created new user");

        // save newUser after the above goes through, happens async
        const savedUser =  await newUser.save();
        console.log("saved new user");
        // send new user back with status 201 (something has been created)
        // always make sure they're getting the right response
        // make sure backend data is coming back properly, creates less work
        // sending back exact savedUser in the correct format 
        res.status(201).json(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

/* LOGGIN IN */

export const login = async (req, res) => {
    try {
        // destructure email and password from req.body
        const { email, password } = req.body;
        // use mongoose to find user with this email, 
        // and bring all their info back 
        const user = await User.findOne({ email: email });
        if (!user) {
            console.error('User not found:', email);
            return res.status(400).json({ msg: "User does not exist. " });
        }
        // determine if the password matches, use bcrypt to compare
        // the password they sent in and the user password 
        // that's been saved in the db. They will use the same salt 
        console.log('Input password:', password);
        console.log('Database password:', user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error('Password not match');
            return res.status(400).json({ msg: "Invalid credentials. " });
        }

        // since passwords match, give user a token, sign it with
        // the user id, and pass in a secret string in the env file 
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        // delete password so it doesn't get sent back to front end
        delete user.password;
        res.status(200).json({ token, user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}