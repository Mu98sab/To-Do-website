import mongoose from "mongoose";
import { validateEmail } from "../util/validation.js" 
import bcrypt from "bcrypt";
import List from "./List.js";

// create the schema for the user model
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is missing, please enter your email"],
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validateEmail, "Invalid email"]
        },

        name: {
            type: String,
            trim: true,
            required: [ true, "User must have name" ]
        },
        
        password: {
            type: String,
            trim: true,
            required: [true, "Password is missing, please enter a password"],
            minlength: [8, "Password is too short, password must be at least 8 charecter"],
        }
    }, 
    {
        timestamps: true        // store the date of last update 
    }
);

// Before saving to the database
userSchema.pre("save", async function ( next ) {
    
    // Generate a salt (the string that is added to the password before applying the hash function)
    // this will increase the difficality for the hackers 
    const salt = await bcrypt.genSalt();

    // this contain the id, email and the password 
    this.password = await bcrypt.hash(this.password, salt);

    // go to the controller
    next();
});

// After creating the user ( register ), create new List called General for the user 
userSchema.post( "save", async function ( doc, next ) {

    // Add new List for the current user called General
    await List.create({
        name: "General",
        owner: doc._id,
    });

    next();
});

// After deleting the user (for test only)
userSchema.post( "deleteOne", async function ( doc, next ) {

    // delete the list where the owner the the id of the deleted user
    if ( doc.deletedCount === 1 ) {
        
        await List.deleteOne(
            {
                owner: this._conditions._id
            }
        );
    }

    next( );
});

// create the model with the specified schema
const User = mongoose.model("user", userSchema);


// export the user model 
export default User;