// middleware user authorization using JSON webtoken
import jwt from "jsonwebtoken";


export const verifyToken = async (req, res, next) => {
    try {
        // grab token from frontend request
        let token = req.header("Authorization");

        // access denied if no token is given at all
        if (!token) {
            return res.status(403).send("Access Denied");
        }

        // remove bearer
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        } 

        // verify user who made request, move on from middleware w/ next
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}