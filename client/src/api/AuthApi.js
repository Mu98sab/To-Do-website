
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
export const fetchUserPOST = async (url, email, password) => {

    // send the POST request by passing the current email and password to url 
    const res = await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify({email, password}),
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