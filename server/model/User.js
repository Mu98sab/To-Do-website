import mongoose from "mongoose";
import { validateEmail } from "../util/validation.js" 
import bcrypt from "bcrypt";

// create the schema for the user model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is missing, please enter your email"],
        unique: true,
        lowercase: true,
        validate: [validateEmail, "Invalid email"]
    },

    password: {
        type: String,
        required: [true, "Password is missing, please enter a password"],
        minlength: [8, "Password is too short, password must be at least 8 charecter"],
    }
});

// Before saving to the database
userSchema.pre("save", async function (next) {
    
    // Generate a salt (the string that is added to the password before applying the hash function)
    // this will increase the difficality for the hackers 
    const salt = await bcrypt.genSalt();

    // this contain the id, email and the password 
    this.password = await bcrypt.hash(this.password, salt);

    // go to the controller
    next();
});

// create the model with the specified schema
const User = mongoose.model("user", userSchema);


// export the user model 
export default User;