import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

    // use the auth context to get the current user
    const { user } = useContext(AuthContext);

    return (
        <div>

            {/* biuld the browser router depending on the value of user */}
            <BrowserRouter>

                <Routes>

                    {/* 
                        if user try to access the home page:
                            - auth user ==> allow to access
                        else:
                            - redirect to the login page
                    */}
                    <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />

                    {/* 
                        if user try to access login or register page:
                            - auth user: nav to home 
                        else: 
                            - allow access
                    */}
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;