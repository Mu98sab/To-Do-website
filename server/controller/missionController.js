import List from "../model/List.js";
import Mission from "../model/Mission.js";
import { handleMissionError } from "../util/format.error.helper.js";


/*
    * TODO: biuld a middle ware on the list shcema such that if the user is trying to add a redendant id to the mission list inside the list model, the request will be rejected  
*/

// new implementation after splitting the mission to be seprate model
// add new mission for a given id list 
export const addMission = async (req, res) => {

    // get the id from the request parameters
    const { list_id } = req.params;

    // get the user id from the request body 
    const { id: userID } = req.body;

    // we don't need it on the mission 
    const missionObj = req.body;

    // Note: for future if i want to add a role field to the mission collection then this id will be the role value
    // delete the id of the owner since we do not need it in the mission fields
    delete missionObj.id;

    try {

        // if the title is empty string throw an error
        if ( req.body.title?.trim() === "" ) {
            throw Error("Empty title");
        }


        /*
            Before inserting the new mission:
                # check if the list id is valid and the user id is acctually the owner of the list

                # NOTE: exists > return null if not exist, id if exist
        */
        const checkLst = await List.exists(
            {
                _id: list_id,
                owner: userID
            }
        );

        // if check list is null then the user has no list with that id
        if (!checkLst) {
            throw Error("List not found");
        }

        // try to creatre the new mission
        await Mission.create( { ...missionObj, list_id } );

        // DONE //
        res.status( 201 ).json();

    } 
    
    catch ( err ) {

        // format the error
        const errFormat = handleMissionError( err );

        if ( Object.keys( errFormat ).length > 0 ) {
            res.status( 400 ).json( errFormat );
        }
        else {
            res.status( 500 ).json( { error: "Unexpcted error :(" } );
        }
    }
    
};


// update the mission with mission id and list id passed as a param
export const updateMission = async ( req, res ) => {

    // get the id of list and mission from the request parameters
    const { list_id, mission_id } = req.params;

    // get the user id from the request body 
    const { id: userID } = req.body;

    // we don't need it on the mission 
    const missionObj = req.body;

    // delete the id of the owner since we do not need it in the mission fields
    delete missionObj.id;

    // the user should not have the ability to change the list id
    delete missionObj.list_id;      
    try {   

        // check if the mission object getted from the req body is not empty after deleting the user id from it
        if ( Object.keys( missionObj ).length === 0 ) {
            throw Error( "You must supply at least one data to update the mission" );
        }

        // cehck if the list belong to the user
        const checkLst = await List.exists(
            {
                _id: list_id,
                owner: userID,
            }
        );
        
        /* 
            If check lst is null, then this mean either:
                - the list is not in the collection at all.
                - the user is not the owner of the list

        */
        if ( !checkLst ) {
            throw Error("List not Found");
        }


        /*
            try to update the mission with the new content passed from the req body.
            * if the result faild:
                - the mission id is not exist 
                - the mission exist but the mission is belong to different list  
                - the values passed to the req body contain some errors such as:
                    + status value to belong [0, 1, 2]
                    + is_important is not boolean
                    + work hour is not number
        */
        const result = await Mission.updateOne(
            {
                _id: mission_id,
                list_id
            },
            missionObj,
            {
                runValidators: true
            }
        );
        
        if ( result.modifiedCount !== 0) {
            res.json( result ); 
        }

        // if nothing modified, mission not exist 
        else {
            throw Error("Mission not found");
        }

    }
    catch ( err ) {
        
        const errFormat = handleMissionError( err );

        if ( Object.keys( errFormat ).length > 0 ) {
            res.status( 400 ).json( errFormat );
        }
        else {
            res.status( 500 ).json( { error: "Unexpcted error :(" } );
        }

    }
};

// TODO: think is it needed
// get mission with a given list and mission id
export const getMission = async ( req, res ) => {

    // get the id of list from the request parameters
    const { list_id, mission_id } = req.params;

    // get the user id from the request body 
    const { id: userID } = req.body;
    
    try {

        // check if list id and owner id match
        const checkLst = await List.exists(
            {
                _id: list_id,
                owner: userID
            },
        );
        
        // list not exist => user do not own the list or the list id is not exist
        if ( !checkLst ) {
            throw Error( "List not found" );
        }

        const mission = await Mission.findOne(
            {
                _id: mission_id,
                list_id
            }
        );

        // not exist => mission not belong to the list id or mission not found
        if ( !mission ) {
            throw Error( "Mission not found" );
        }
        // pass the mission list back to the client
        res.json( mission );

    }
    catch ( err ) {

        const errFormat = handleMissionError( err );

        if ( Object.keys( errFormat ).length > 0 ) {
            res.status( 400 ).json( errFormat );
        }
        else {
            res.status( 500 ).json( { error: "Unexpcted error :(" } );
        }

    }

};

// delete the mission with a given mission and list id 
export const deleteMission = async ( req, res ) => {
    
    // get the id of list from the request parameters
    const { list_id, mission_id } = req.params;

    // get the user id from the request body 
    const { id: userID } = req.body;

    try {
        
        // check if the user own the list or if the list acctually exist
        const checkLst = await List.exists(
            {
                _id: list_id,
                owner: userID
            },
        );

        // if the user own the list then delete the mission
        if ( checkLst ) {

            // try to delete the mission with that belong to the passed list id 
            const result = await Mission.deleteOne(
                {
                    _id: mission_id,
                    list_id
                },
            );
            
            // mission cannot be deleted => not found or the mission do not belong to the passed list id
            if ( result.deletedCount === 0 ) {
                throw Error( "Mission not found" );
            }

            console.log( result.deletedCount );
            // 1. what if result.deletedCount is 0 ?? request faild list not exist or user do not own the list 
            
            // deleted, no content response
            res.status( 204 ).json();
        }

        // if user do not own the mission or list not exist
        else {
            throw Error( "List not found" );
        }
        

    }
    
    catch ( err ) {

        const errFormat = handleMissionError( err );

        if ( Object.keys( errFormat ).length > 0 ) {
            res.status( 400 ).json( errFormat );
        }
        else {
            res.status( 500 ).json( { error: "Unexpcted error :(" } );
        }

    }

};