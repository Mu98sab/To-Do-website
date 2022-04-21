
export const handleListErr = ( error ) => {

    const errors = { };

    /* 
        Error happen because:
            1. list not exist in DB or 
            2. list exist but the user is not autherized to access it (not the owner)
    */
    if ( error.message === "List not found" ) {
        
        errors.list_id = error.message;
    }

    // list id cannot be casted to ObjectID
    else if ( error.name === "CastError" ) {

        errors.list_id = "Invalid list id";
    }


    // if the error with 11000 code, then the user is trying to create a list with a name that is already exists
    else if ( error.code === 11000 ) {
        errors.name = "List name already exist";
    }

    // name not exist in PUT 
    else if ( error.message === "You must supply at least one data to update the list" ) {
        errors.list_id = error.message;
    }

    // missing name in POST
    else if ( error.errors?.name?.kind === "required" ) {
        errors.name = "List must have a name";
    }

    return errors;
};


export const handleMissionError = ( error ) => {

    const errors = {};


    // title is not in req.body or title is empty string
    if ( 
                error.message === "Empty title" || 
                error.errors?.title?.message?.includes("Path `title` is required." )
            ){
        errors.title = "Title cannot be empty";
    }

    // if the list id couldn't be casted from string to mongodb ObjectId, then the id is invalid
    else if ( error.name === "CastError" ) {

        // get the name of the attribute that causes the error
        let field = error.path;

        // if the attribute is _id, then we have two different ids: list and mission id        
        if ( error.path === "_id" ) {

            // the field that causes the error is written in the error message so check it
            if ( error.message?.includes( "mission" ) ) {
               field = "mission_id";
            }
            else if ( error.message?.includes( "list" ) ) {
                field = "list_id";
            }   
        }

        // add the proper error message
        errors[ field ] = field + " must be of type " + error.kind;
    }

    // if status, work_hour or is_important has a casting error
    else if ( error.errors && error.message?.includes( "Cast to" ) ) {
        
        let errorObject = error.errors;

        /*
            since the above object contain the name of the field that causes the error, get the name of the key by using the Object.keys constructor. 

            The below object shows the structure of the error

            error: {
                errors: {
                    `name of the field that causes the error`: {
                        path: "name of the field that causes the error",
                        kind: "the expected type"
                    }
                }
                message: "..."
            }

        */
        errorObject = errorObject[ Object.keys( errorObject )[ 0 ] ];

        // add the proper error message
        errors[ errorObject.path ] = errorObject.path + " must be of type " + errorObject.kind;
    }

    // handle invalid status => not belong to [ 0, 1, 2 ]
    else if ( error.message?.includes( "is not a valid enum value for path `status`." ) ) {
        errors.status = "Status value must be [0, 1, 2] only.";
    }

    // empty json error ||
    // list id error, either not found or the user is not autherized to access it ||
    // invalid mission id error || 
    // empty title
    else if ( 
        
        error.message === "You must supply at least one data to update the mission" ||  // TODO: change this 
        error.message === "List not Found" ||
        error.message === "Mission not found" ||
        error.message === "Empty title"                                     // TODO: change this 
        ) { 
        errors.json = error.message;
    }

    // mission name already title
    else if ( error.code === 11000 ) {
        errors.title = "Mission title `" + error.keyValue.title + "` already exist ";
    }

    return errors;
};

export const handleUserErr = ( error ) => {

    const errors = { };

    // if the data is missing some fields, call this function to get the sutible message
    if ( error.message.includes( "cannot be empty" ) ) {

        // if so, split the error massage
        const errorList = error.message.split(":");

        // assing each errors key with the coresponding error
        errors.email = errorList[0];
        errors.password = errorList[1];
        if ( errorList.length === 3 ) {
            errors.name = errorList[2];
        }
    }

    // This code denote that the email trying to register with is already register
    else if ( error.code === 11000 ) {
        errors.email = "This email is already registered";
    }

    else if ( error.message.includes( "user validation failed:" ) ) {     // if the error is from the validation

        /* 
            get the error object 
            this object has this structure {email: ..., password: ... }
        */
        const errObj = error.errors;

        // for each keys, which are email, password or both or non
        Object.keys( errObj ).forEach( ( key ) => {

            // the value of both keys contain a property key. this key has an object that contain the message, path, value, etc.
            errors[ key ] = errObj[ key ].properties.message;
        });
    }

    else if ( error.message === "Incorrect email" || error.message === "Email is not registered" ) {
        errors.email = error.message;
    }
    // handle the login incorrect password
    else if ( error.message === "Incorrect password" ) {
        errors.password = error.message;
    }

    return errors;
} 