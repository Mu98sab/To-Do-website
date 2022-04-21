import jwt from "jsonwebtoken";
import config from "../config.js";

// Create the token
export const createToken = (id, expiringDate) => {          // expiring date will be used later on, when i want to deploy the project
    // create a new token and pass the id as a payload
    return jwt.sign(
        { id },                     // the payload
        config.jwtSecret,           // the secret value
        {expiresIn: 3 * 60/*expiringDate*/}   // the options
    );
};
