import dotenv from "dotenv";

// configure dotenv 
dotenv.config({path: "./.env.local"});      // specify the path of the env file

// this object contain all the secrets stored inside the .env.local file
const config = {
    dbURI: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET
}; 

export default config;