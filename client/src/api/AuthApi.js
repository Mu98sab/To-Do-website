import backendAPI from "../utils/axios.config";

// POST request to the server to either login or regiter depending on the url
export const fetchUserPOST = async (action, newUser) => {

    // send the POST request by passing the current email and password to url
    return ( await backendAPI.post(
        action,
        newUser
    )).data;
};