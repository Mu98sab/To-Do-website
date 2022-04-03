import { createContext, useEffect, useState } from "react";
import { isAuth } from "../api/AuthApi";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        
        setLoading(true);

        // call is Authenticated
        isAuth()
        .then( (data) => {

            // TODO: delete the print
            console.log(data);

            // if responce contain errors then user not auth
            if (data.errors) {
                setUser(null);
            }
            else {  // auth user set the user state
                setUser(data);
            }

            // stop the loading
            setLoading(false);
        });
    } ,[]);

    if (loading) {
        return (<>Loading...</>);
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}
