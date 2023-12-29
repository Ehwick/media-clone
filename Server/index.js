// import project dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
// path variables for interacting w/ mod
import path from "path";
import { fileURLToPath } from "url"; 
// route functionalities
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
// fake data and User/Post models
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// used to reference file and directory 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// configure .env file
dotenv.config();
// invoke express, and equip with middleware for the project
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// in a live production app, would want to store somewhere more robust 
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// file storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  })
const upload = multer({ storage });  

/* ROUTES INVOLVING FILE UPLOADS */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* REGULAR ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
// mongoose module to connect to URL in env file (not posted 
// on GitHub)
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
}).then(() => {
    // express listens at PORT number (3001 or 6001)
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // manually insert data.js file 
    /* ADD DATA ONLY ONCE 
    User.insertMany(users); 
    Post.insertMany(posts); */

}).catch((error) => console.log(`${error} did not connect`));