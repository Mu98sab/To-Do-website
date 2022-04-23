import useFetchAuth from "../utils/hooks/useFetchAuth";
import styles from "../styles/auth.module.css";
import AuthInput from "../components/auth/AuthInput";
import { Link } from "react-router-dom";
import RememberMe from "../components/auth/RememberMe";
import { useState } from "react";


export default function Register(props) {

    // use the fetch auth hook which contain all the states and their setters along with the event of submit
    const {
        email, 
        password, 
        rememberMe, 
        error, 
        setEmail, 
        setPassword, 
        setRememberMe,
        submitEvent
    } = useFetchAuth("/register");

    const [name, setName] = useState("");

    return (
        <div className={styles.flexContainer}>

            <form className={styles.formContainer} onSubmit={(event) => {submitEvent(event, {email, name, password})}} > 
                
                {/* Form header */}
                <h1>Register</h1>
                

                {/* Email auth input */}
                <AuthInput 
                    name="Email" 
                    type="email" 
                    placeHolder="Enter your email" 
                    setState={setEmail} 
                    value={email}
                    error={error.email ?? ""}
                />

                {/* Name auth input */}
                <AuthInput 
                    name="Name"
                    type="text"
                    placeHolder="What you want to be called"
                    setState={setName}
                    value={name}
                    error={error.name ?? ""}
                />

                {/* Password auth input */}
                <AuthInput 
                    name="Password" 
                    type="password" 
                    placeHolder="Chose strong password" 
                    setState={setPassword} 
                    value={password} 
                    error={error.password ?? ""} 
                />

                {/* Submit button */}
                <button type="submit" className={styles.submitBtn}>Register</button>

                <div className={styles.hr}></div>
                
                {/* Remember me // not programmed yet */}
                <RememberMe rememberMe={rememberMe} setRememberMe={setRememberMe} />
                
                {/* Link to the login page */}
                <span>Already have account?  <Link to={"/login"}>Login</Link></span>
                
            </form>
        </div>        
    );
}