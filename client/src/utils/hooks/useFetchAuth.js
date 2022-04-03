import { useState } from "react";
import { fetchUserPOST } from "../../api/AuthApi";

const useFetchAuth = (url) => {
    
    // initialize the input state 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // initialize the error states
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState(""); 


    // form Submission controller 
    const submitEvent = async (event) => {

        // set the errors to be an empty string 
        setEmailErr("");
        setPasswordErr("");

        // prevent the default action of the form so that it will not send a post request automatically
        event.preventDefault();


        try {
            
            // try to send POST req to the server 
            const json = await fetchUserPOST(url, email, password);  
            
             // TODO: delete the print
             console.log(json)
                
             // then check if the json contain errors key, set the erros state to be the values getted from the errors key
             if (json.errors) {
                 setEmailErr(json.errors.email);
                 setPasswordErr(json.errors.password);
             }
             
             // if there is not errors
             else {      

                 // TODO: delete the printo
                 console.log(json.user);

                 // reload the page to redirect to reflect the changes (go to the home page)
                 window.location.reload(false);
             }

        }
        catch (err) {   
            // TODO: create a proper error message
            console.log(err);
        }
    };

    // return the needed states and their setters
    return {email, password, rememberMe, emailErr, passwordErr, setEmail, setPassword, setRememberMe, submitEvent};
};

export default useFetchAuth;