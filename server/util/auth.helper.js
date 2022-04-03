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

// Format the error object to understandable message
export const formatRegisterationErr = (err) => {

    // initialize the error object which then returned back
    let error = { email: "", password: "", name: "" };

    // if the data is missing some fields, call this function to get the sutible message
    missingErrHandler(err, error);

    /////// handle the register errors ///////
    // This code denote that the email trying to register with is already register
    if (err.code === 11000) {
        error.email = "This email is already registered";
    }
    else if (err.message.includes("user validation failed:")) {     // if the error is from the validation

        /* 
            get the error object 
            this object has this structure {email: ..., password: ... }
        */
        const errObj = err.errors;

        // for each keys, which are email, password or both or non
        Object.keys(errObj).forEach((key) => {

            // the value of both keys contain a property key. this key has an object that contain the message, path, value, etc.
            error[key] = errObj[key].properties.message;
        });
    }

    return error;
};

export const formatLoginErr = (err) => {

    // initialize the error object which then returned back
    let error = { email: "", password: "" };

    // if the data is missing some fields, call this function to get the sutible message
    missingErrHandler(err, error);

    // handle the error of incorrect login email
    if (err.message === "Incorrect email" || err.message === "Email is not registered") {
        error.email = err.message;
    }
    // handle the login incorrect password
    else if (err.message === "Incorrect password") {
        error.password = err.message;
    }

    return error;
};

// function to handle the error happen when the user didn't pass all the fields on his request 
const missingErrHandler = (err, error) => {

    // check if the message of the error cotain the needed message
    if (err.message.includes("cannot be empty")) {

        // if so, split the error massage
        const errorList = err.message.split(":");

        // assing each errors key with the coresponding error
        error.email = errorList[0];
        error.password = errorList[1];
        if (Object.keys(error).length === 3) {
            error.name = errorList[2];
        }
    }
};