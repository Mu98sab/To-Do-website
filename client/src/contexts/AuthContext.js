import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect( () => {
        // call is Authenticated
        setLoading(true);
        fetch(
            "http://localhost:4000/api/v1/is-authenticated",  
            {credentials: 'include'}
        )
        .then( (res) => {
            return res.json();  
        })
        .then( (data) => {
            console.log(data)
            if (data.errors) {
                setUser(null);
            }
            else {
                setUser(data);
            }
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
