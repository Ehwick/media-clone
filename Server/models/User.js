// will help use set up model 
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        // create a first name w/ these properties
       firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50, 
       }, 
       lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50, 
       }, 
       email: {
        type: String,
        required: true,
        max: 50, 
        // can't have duplicate emails
        unique: true,
       }, 
       // usually more configs for password
       password: {
        type: String,
        required: true,
        min: 5,
        max: 50, 
       }, 
       picturePath: {
        type: String,
        default: "",
       }, 
       friends: {
        type: Array,
        default: [],
       }, 
       location: String,
       occupation: String,
       viewedProfile: Number,
       impressions: Number,
    },
    // will give us automatic dates for when it's created/updated
    { timestamps: true }
);

// when creating mongoose model, create schema first
// and then pass it into mongoose.model 
const User = mongoose.model("User", UserSchema)

export default User;
