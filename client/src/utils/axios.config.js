import axios from 'axios';

// create a new exios pass the base URL inside it
const backendAPI = axios.create({
    baseURL: "http://localhost:4000/api/v1",
    
    withCredentials: true,      // to accept and sends cookies
    
    // accept only the responces with status less than 500 else throw an error
    // TODO: think whether to include the 400 as not accepted or not 
    validateStatus: ( status ) => {             
        return status < 500;
    }
});

export default backendAPI; 