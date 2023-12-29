import express from "express";
// will  need to write a login controller
import { login } from "../controllers/auth.js";

// set up a router, allows express to identify that 
// all these routes will be configured and keep
// us in seperate files
const router = express.Router();

router.post("/login", login);

export default router;