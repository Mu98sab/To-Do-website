import jwt  from "jsonwebtoken";
import config from "../config.js";


/*
    Check if the user is autherized:
        if yes:
            add the id from the payload to the req.body

        if no:
            send unautherized json with out executing next 
            
    since in "no" case next is not called, if this middleware added before the controller of the route, then the controller will not be executed if the user is not autherized
*/
const checkAuth = (req, res, next) => {
    
    // get the jwt token from the cookies 
    const jwtToken = req.cookies.jwt;

    // check if the token exist
    if (jwtToken) {
        jwt.verify(jwtToken, config.jwtSecret, (err, payload) => {
            // check if there is an error, then it means that the token has been changed. Thus, user is unautherized
            if (err) {
                res.status(401).json({errors: "Unautherized"});
            }
            else {
                // save the id getted from the payload to the req.body
                req.body.id = payload.id;

                // go to the next controller
                next();
            }
        });
    }   
    else {
        // unautheized user
        res.status(401).json({errors: "Unautherized"});
    }
};

export default checkAuth;