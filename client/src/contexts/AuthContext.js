import { createContext, useEffect, useState } from "react";
import backendAPI from "../utils/axios.config";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        
        setLoading(true);

        // call is Authenticated
        backendAPI.get( "/is-authenticated" )
        .then( ( {data} ) => {
            // if responce contain errors then user not auth
            if ( data.errors ) {
                setUser(null);
            }
            else {  // auth user set the user state
                setUser( data.user );
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
