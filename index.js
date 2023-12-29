import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
// path is a native package, comes with node already 
import path from "path";
// also native, allows us to properly set paths
// during our directory configurations 
// fileURLToPath is in curly braces because it may not
// be the default export, so need to specify when
// a module exports multiple values
import { fileURLToPath } from "url"; 
// will store path and routes for every type of feature
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
// need to create a register function in the given path 
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";


/* CONFIGURATIONS OF MIDDLEWARE, i.e. FUNCTIONS
THAT RUN IN BETWEEN DIFFERENT THINGS */

// import.meta.url is used to get metadata, specifically
// the URL of the current module. fileURLToPath 
// is part of the url module, it converts a 
// file URL to a file path 
// "__" is used as a convention to indicate a variable
// or identifier that is reserved for internal use within
// a module or script. 
const __filename = fileURLToPath(import.meta.url);
// needed to acquire __filename to be able to access __dirname
// all of this is only done when we use the type modules
const __dirname = path.dirname(__filename);
//invokes letting us use dotenv files
dotenv.config();
// invoke express to be able to use middleware
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// set the directory of where we keep our assets, like images
// in a real live production app, would want to store in actual
// file storage directory or a cloud like S3
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* SET UP FILE STORAGE CONFIGURATIONS */

// a lot of this is coming from the package instructions, from 
// multer GitHub repo. 
// any time someone uploads a file into your website, its destination
// will be public/assets 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    // determines filename of inputted file. If none passed, multer will
    // randomly generate one 
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
  })

// helps us save file. will use upload to upload files
const upload = multer({ storage });  

/* ROUTES WITH FILES */

// if you want to register, call this API from the frontend
// go to route, use middleware to upload single picture using
// upload, multer, and storage to public/assets
// upload function is middelware because it occurs in between,
// and before the actual logic, which in this case is register
// register is a controller, i.e. the logic of the endpoint
app.post("/auth/register", upload.single("picture"), register);
// need to create another such function to upload posts
// whaterver you pass in as an argument to upload function
// determines under which HTTP property file appears
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */

// will help us set up routes and keep it all clean
// have /auth, and authRoutes. authRoutes is in 
// /routes/auth.js, will append /auth 
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);


// dotenv file is used to connect to our mongoDB online account
// it runs on port3001 (backend) while frontend runs on 3000

/* MONGOOSE SETUP */

// port should be the one at .env file named port, 
// 6001 is a backup 
// use mongoose module to connect to URL in env, set 
// configurations to true, this is structured like a fetch function
// with .then and .catch methods 
// make express app listen to port and output server port: $(PORT)
const PORT = process.env.PORT || 6001;
mongoose
.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
}).then(() => {
    // upon running node index.js, connects to MONGO_URL and uses express
    // to listen to it at its 3001 port 
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // manually insert data.js file 
    /* ADD DATA ONLY ONCE 
    User.insertMany(users); 
    Post.insertMany(posts); */

}).catch((error) => console.log(`${error} did not connect`));


// connect server to mongo db 
// listen at port 3001 for requests