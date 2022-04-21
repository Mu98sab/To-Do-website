import express from "express";
import mongoose from "mongoose";
import config from "./config.js";
import authRouter from "./routes/authRoutes.js";
import toDoRouter from "./routes/toDoRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// initilize express app
const app = express();


// Database connection
mongoose.connect( config.dbURI )
.then( () => {
    // start the server at port
    app.listen( 4000, () => { console.log( "server start running at port 4000" ) } );
})
.catch( ( err ) => {
    console.log( err );
});


// middleware
app.use( express.json() );            // This will allow to use the body object from the reqest 

app.use( cookieParser() );            // This will simplify the use of cookies and allow to use req.cookie

// This will allow the backend to make a request to the frontend  (cross-origin)
app.use( cors( { credentials: true, origin: 'http://localhost:3000' } ) );

// this will allow to accept the credential from the frontend request since cors   
app.use( function ( req, res, next ) {
    res.header( "Access-Control-Allow-Credentials", "true" );
    res.header( "Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With" );
    res.header( "Access-Control-Allow-Methods", "PUT,POST,PATCH,GET,DELETE,OPTIONS" );
    next();
});

// Api Routes
app.use( "/api/v1", authRouter );     // auth routes
app.use( "/api/v1", toDoRouter );      // to do routes