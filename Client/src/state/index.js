// of all state management libraries, redux is great
// because proven for long period of time
// toolkit simplifies many things
import { createSlice } from "@reduxjs/toolkit";

// state that will be stored in global state 
// will be accessible throughout entire app
// this initial state is storing auth information
const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

// reducers are functions that modify the global state 
export const authSlice = createSlice({
    // name of slice is authslice
    name: "auth",
    // invoke the initial state
    initialState,
    // set reducer functions, which are made by setting setFunctions
    // and modifying the state.Function
    // all are simple functions that modify our state
    reducers: {
        setMode: (state) => {
            // redux has idea that we have to replace instead of modifying state
            // toolkit makes it seem like it modifies it directly
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        // action is where you set the payload, really just the params/arguments
        setLogin: (state, action) => {
            // in the payload there is a user parameter, set that in state.user
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :( ")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            })
            state.posts = updatedPosts;
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;

// this will be the entire logic for redux