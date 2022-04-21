import mongoose from "mongoose";
import Mission from "./Mission.js";

// create the schema for the List model
const listSchema = new mongoose.Schema(
    {
        // name: string not nullable
        name: {
            type: String,
            required: true,
            trim: true
        },

        // owner: string not nullable
        owner: {
            type: "ObjectId",
            ref: "User",
            required: [ true, "List must have owner" ]
        },

        // collaborators: list of string nullable
        // contain list of users ids
        // collaborators: [String],        // this might be changed to ObjectId type later on

        // missions: list of string nullable
        mission: {
            type: ["ObjectId"],
            ref: "mission"
        }
    },
    {
        timestamps: true        // to store the date of the last action in the list
    }
);

// add a unique index such that owner and name togather are unique
listSchema.index( { owner: 1, name: 1 }, { unique: true } );

// pre delete middleware
listSchema.post( "deleteOne", async function ( doc, next ) {
    
    const list_id = this._conditions._id;
    
    // delete all the missions belong to the deleted list
    await Mission.deleteMany(
        {
            list_id
        }
    );

    next();
});

// create the model with the above schema
const List = mongoose.model( "list", listSchema );

// export the List model
export default List;