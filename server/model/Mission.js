import mongoose from "mongoose";
import List from "./List.js";

// Create mission schema
const missionSchema = new mongoose.Schema(
    {   
        // title: string not nullable
        title: {
            type: String,
            required: true,
            trim: true
        },

        // description: string nullable
        description:{
            type: String,
            trim: true
        },

        // status: int not nullable
        status: {
            type: Number,
            enum: [
                0,      // To Do
                1,      // Doing
                2       // Done
            ],
            default: 0,
        },

        // is important: boolean not nullable
        is_important: {
            type: Boolean,
            default: false
        },

        // work hour: string not nullable
        work_hour: {
            type: Number,
            default: 0,
        },

        // for which list does this mission belong to 
        list_id: {
            type: "ObjectId",
            ref: "List",
            required: [ true, "Mission must belong to list" ]
        }
    },
    {
        timestamps: true    // save the date of last action in mission
    }
);

// Set the unique index to both title and the list_id
missionSchema.index( { title: 1, list_id: 1 }, { unique: true } );

// add post middleware: hooked when the delete one is finished
missionSchema.post("deleteOne", async function ( doc, next ) {
    console.log("Hey there", doc);
    // check if some data is deleted 
    if ( doc.deletedCount === 1 ) {

        // get both missionID and listID from this object
        const missionID = this._conditions._id;
        const listID = this._conditions.list_id;

        console.log( "mission id: ",missionID );

        // delete the mission id from the list id 
        await List.updateOne(
            {
                _id: listID
            },
            {
                $pull: {
                    mission: missionID
                }
            }
        );
    } 

    // go to the next middleware
    next();
});

// pre save middleware: before saving
missionSchema.pre( "save", function ( next ) {

    // status is null
    if ( !this.status ) {
        this.status = 0;
    }

    // work hour is null
    if ( !this.work_hour ) {
        this.work_hour = 0;
    }

    next();
});

// Pre update middleware: before updating 
missionSchema.pre( "updateOne", function ( next ) {
    
    const updatedMission = this._update;

    // status is null
    if ( updatedMission.status === "" ) {
        this._update.status = 0;
    }

    // work hour is null
    if ( updatedMission.work_hour === "" ) {
        this._update.work_hour = 0;
    }

    next();
});


// TODO: test this function it's not tested!!!
// Post save add the mission id to the mission list inside the list module
missionSchema.post( "save",  async function ( doc, next ) {

    // add the id of the new created mission to the mission list inside the list model with the id list_id
    await List.updateOne(

        // NOTE: no need to check the if the list belong to the user since it have been checked in the add mission controller so that the code will not reach here if the owner do not own the list

        // query: update where the id list is same of the id from the params 
        { 
            _id: doc.list_id, 
        }, 

        // the mission that need to be added
        { 
            $push : { 
                mission: doc._id,
            }
        },
    );

    next( );
});

// create the mission model from the mission schema
const Mission = mongoose.model( "mission", missionSchema );

// exprot the mission model
export default Mission;