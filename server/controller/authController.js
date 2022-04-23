import User from "../model/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../util/auth.helper.js";
import { handleUserErr } from "../util/format.error.helper.js";


// initialize the expiring date to be 2 weeks in seconds
// const expiringDate = 14 * 24 * 60 * 60;

// test expiring date:
const expiringDate = 60 * 5;    // 5 minute

////////// Register Controller ////////// 
export const registerController = async (req, res) => {

    // restructure both the email and the password
    const {email, password, name} = req.body;
    
    // initialize the error object
    const errors = { email: "", password: "", name: "" };

    try {

        if ((typeof email) === "undefined" || (typeof password) === "undefined" || (typeof name) === "undefined" || email.trim() === "" || password.trim() === "" || name.trim() === "") {
            if (typeof email === "undefined" || email.trim() === "") {
                errors.email = "Email cannot be empty";
            }
            if (typeof password === "undefined" || password.trim() === "") {
                errors.password = "Password cannot be empty";
            }

            if (typeof name === "undefined" || name.trim() === "") {
                errors.name = "Name cannot be empty";
            }

            throw Error(errors.email + ":" + errors.password + ":" + errors.name);
        }

        // try to create the user with thew passed email and password
        const user = await User.create({email, name, password});

        // create a new jwt token
        const jwtToken = createToken(user._id, expiringDate);

        // set the cookie
        res.cookie(
            "jwt", 
            jwtToken,
            {
                httpOnly: true,                 // do not allow the cookies to be accessed from the frontend
                // secure: true,                // do not allow the cookies to be sent if the request is not from https protocol
                maxAge: expiringDate * 1000     // set the expiring date. multiply it by 1000 because it accepts date in milli
            }
        );

        // 201 means that the user has been created successfully
        res.status( 201 ).json( );             
    }
    catch (err) {
        // send an error with 400 status 
        res.status(400).json({errors: handleUserErr(err)});
    }
};

////////// Login Controller ////////// 
export const loginController = async (req, res) => {
    
    // grap the email and password from the body object
    const { email, password } = req.body;
    
    // initialize the error object
    const errors = { email: "", password: "" };
    try {
        

        if ((typeof email) === "undefined" || typeof password === "undefined" || email.trim() === "" || password.trim() === "") {
            if (typeof email === "undefined" || email.trim() === "") {
                errors.email = "Email cannot be empty";
            }
            if (typeof password === "undefined" || password.trim() === "") {
                errors.password = "Password cannot be empty";
            }

            throw Error(errors.email + ":" + errors.password);
        }
        
        
        // try to find a user with the email and password from the post request
        const user = await User.findOne({ email: email });

        // if exist, create a token 
        if (user) {

            // compare the entered password with the hashed password from the database
            const isAuth = await bcrypt.compare(password, user.password);

            // if the password is correct
            if (isAuth) {
                // create a new token
                const jwtToken = createToken(user._id, expiringDate);

                // set the cookie to be the jwt token and set the expiring date to be 2 weeks
                res.cookie(
                    "jwt", 
                    jwtToken,
                    {
                        httpOnly: true,                 // do not allow the cookies to be accessed from the frontend
                        // secure: true,                // do not allow the cookies to be sent if the request is not from https protocol
                        maxAge: expiringDate * 1000     // set the expiring date. multiply it by 1000 because it accepts date in milli
                    }
                )
                // if works fine, send the user object.
                res.status( 204 ).json( );
            }
            else {
                throw Error("Incorrect password");
            }
        }
        else {
            throw Error("Email is not registered");
        }
    }
    catch (err) {
        // handle the error
        res.status(400).json({errors: handleUserErr(err)});
    }

};

////////// Logout Controller ////////// 
export const logoutController = (req, res) => {

    // // Create a new jwt token to override the previuos one 
    // const jwtToken = createToken(req.body.user, 1);
    // send a new cookie also to override the previuos cookie with small time to make the user logout
    res.cookie(
        "jwt", 
        "",
        {
            httpOnly: true,                 // do not allow the cookies to be accessed from the frontend
            // secure: true,                // do not allow the cookies to be sent if the request is not from https protocol
            maxAge: 1 * 100     // set the expiring date. multiply it by 1000 because it accepts date in milli
        }
    );
    
    res.status( 204 ).json({});

};

export const isAuthenticatedController = (req, res) => {

    // the id in the body come from the middleware
    res.json({user: req.body.id});
   
};

export const deleteTestUser = async ( req, res ) => {
    
    // get the user id
    const userId = req.body.id;

    // delete the user if and only if the user has the email test2@gmail.com
    const result = await User.deleteOne(
        {
            _id: userId,
            email: "test2@gmail.com"
        },
    )
    
    // if deleted, send a responce with no content
    if ( result.deletedCount == 1 ) {
        res.status( 204 ).json( );
    }

    // if not deleted, send an error message
    else {
        res.status( 403 ).json( { errors: "Unautherized to perform this action" } );
    }
    
}