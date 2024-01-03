import express from "express";
// import login controller function 
import { login } from "../controllers/auth.js";

// router for auth/login route w/ login function 
const router = express.Router();
router.post("/login", login);

export default router;