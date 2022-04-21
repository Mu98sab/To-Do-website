import fetch from 'cross-fetch';        // fetch for jest

export const registerFetch = ( newUser ) => {
    return fetch (
        "http://localhost:4000/api/v1/register",
        {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: 'include'
        }
    );
};

export const loginFetch = ( newUser ) => {
    return fetch (
        "http://localhost:4000/api/v1/login",
        {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: 'include'
        }
    ); 
};

export const logoutFetch = () => {
    return fetch (
        "http://localhost:4000/api/v1/logout",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            credentials: 'include'
        }
    ); 
};