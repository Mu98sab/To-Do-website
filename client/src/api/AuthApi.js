
// logout API, fetch the GET request for logout, send the cookies to check the current user
export const logoutAPI = async () => {
    return await fetch(
        "http://localhost:4000/api/v1/logout",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",       
            credentials: 'include',         // include the cookies
        }
    );
};

// POST request to the server to either login or regiter depending on the url
export const fetchUserPOST = async (url, newUser) => {

    // send the POST request by passing the current email and password to url 
    const res = await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: 'include',
        }
    );

    // return the response in a JSON format
    return await res.json(); 
};


/* GET request responsible for:
    1- pass the JWT token in cookies to the server
    2- check if auth
    3- return the user either valid or null
*/
export const isAuth = async () => {
    const res = await fetch(
        "http://localhost:4000/api/v1/is-authenticated",  
        {credentials: 'include'}
    );

    return await res.json();
};