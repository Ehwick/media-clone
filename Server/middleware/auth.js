// verify token is a middleware function because it must execute next function only if verified

import jwt from "jsonwebtoken";


export const verifyToken = async (req, res, next) => {
    try {
        // from request in the frontend, token will be set
        // on the front end on authorization header
        // we grab it with this token
        let token = req.header("Authorization");

        // i.e. if there is not a jwt token 
        if (!token) {
            return res.status(403).send("Access Denied");
        }

        // want token to start with Bearer which is set on the front end
        // take everything from the right side of bearer
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        } 

        // verify jwt passing in token and and secret string
        // make req.user verified, go onto next middleware function 
        // next can almost be used like a decorator function that is 
        // passed before another function, checks a condition, and if 
        // true, allows to proceed, as you'd like for login authorization 
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}