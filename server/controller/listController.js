import List from "../model/List.js";
import { handleListErr } from "../util/format.error.helper.js";


// get all the lists for a given id:
export const getLists = async (req, res) => {
    
    try { 
        // this id is added by the middleware checkAuth
        const userID = req.body.id;
        
        // retreive all the list for the requested user
        const userLists = await List.find( { owner: userID } ).populate( "mission" );

        // send the lists to the user in json format
        res.json(userLists);
    }
    catch ( err ) {
        res.status( 500 ).json( { error: "Unexpcted error :(" } );
    }

};


// add new list to a given user id:
export const addList = async (req, res) => {

    // this id is added by the middleware checkAuth
    const {name, id: owner} = req.body;

    try {

        // try creating a new list with the requested name to the requested user
        await List.create({name, owner});

        // in case there are no errors return the list of the create list to the user in json format
        res.status( 201 ).json();

    }
    catch (err) {   

        // format the error
        const errFormat = handleListErr( err );

        if ( Object.keys( errFormat ).length > 0 ) {
            res.status( 400 ).json( errFormat );
        }
        else {
            res.status( 500 ).json( { error: "Unexpcted error :(" } );
        }
    
    }

};



// get list by list id:
export const getList = async ( req, res ) => {
    
    // get the requested user id and the list id
    const { id: userID } = req.body;

    // get the lsit id from the url params
    const { list_id } = req.params;

    try {
        
        // get the list by id 
        const result = await List.findById(
            { 
                _id: list_id, 
                owner: userID 
            }
        ).populate( "mission" );
        
        // not found list
        if ( !result ) {        // if it's null
            throw Error( "List not found" );
        }
        
        res.json( result );
    }

    // case errors
    catch ( err ) {

        const errFormat = handleListErr( err );

        if ( Object.keys( errFormat ).length > 0 ) {
            res.status( 400 ).json( errFormat );
        }
        else {
            res.status( 500 ).json( { error: "Unexpcted error :(" } );
        }
    
    }
   
};

// Update list controller
export const updateList = async ( req, res ) => {
    
    // get the requested user id and the list id
    const { id: userID, name } = req.body;

    // get the lsit id from the url params
    const { list_id } = req.params;


    try {

        // empty json
        if ( !name ) {
            throw Error( "You must supply at least one data to update the list" );
        }   
        
        // update 
        const result = await List.updateOne(
            {
                _id: list_id,
                owner: userID
            },
            {
                name
            },
            {
                runValidators: true,    // by default the validation is not activated in update 
            }
        );

        // nothing were modified
        if ( result.modifiedCount === 0 ) {
            
            // this mean that the list is not owned by the requested or the list is not acctually exist
            throw Error( "List not found" );
        }

        // send a responce to the user
        res.status( 204 ).json( );

    }   
    catch ( err ) {
        
        const errFormat = handleListErr( err );

        if ( Object.keys( errFormat ).length > 0 ) {
            res.status( 400 ).json( errFormat );
        }
        else {
            res.status( 500 ).json( { error: "Unexpcted error :(" } );
        }
        
    }   
};


// delete a list with the given list id
export const deleteList = async ( req, res ) => {

    // get the requested user id and the list id
    const { id: userID } = req.body;

    // get the lsit id from the url params
    const { list_id } = req.params;

    try {
        
        // try to delete the list with the list id 
        const result = await List.deleteOne(
            {
                _id: list_id,
                owner: userID
            },
        );

        //  if nothing were deleted, list not found or user do not own the list
        if ( result.deletedCount === 0 ) {
            throw Error( "List not found" );
        }
        
        res.status( 204 ).json();
    }
    catch ( err ) {

        const errFormat = handleListErr( err );

        if ( Object.keys( errFormat ).length > 0 ) {
            res.status( 400 ).json( errFormat );
        }
        else {
            res.status( 500 ).json( { error: "Unexpcted error :(" } );
        }
    }

};