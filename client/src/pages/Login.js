
import { Link } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import RememberMe from "../components/auth/RememberMe";
import styles from '../styles/auth.module.css';
import useFetchAuth from "../utils/hooks/useFetchAuth";

export default function Login(props) {
    
    // use the fetch auth hook which contain the all the states and also the function that done the POST request to the server
    const {
        email,
        password, 
        rememberMe, 
        error,
        setEmail, 
        setPassword, 
        setRememberMe, 
        submitEvent
    } = useFetchAuth("/login");     // pass the POST action to the hook

    return (
        <div className={styles.flexContainer}>

            <form className={styles.formContainer} onSubmit={(event) => {submitEvent(event, {email, password})}} > 
                
                {/* Form header */}
                <h1>Log In</h1>

                {/* Email auth input */}
                <AuthInput 
                    name="Email" 
                    type="email" 
                    placeHolder="Enter your email" 
                    setState={setEmail} 
                    value={email}
                    error={error.email ?? ""}
                />

                {/* Password auth input */}
                <AuthInput 
                    name="Password" 
                    type="password" 
                    placeHolder="Enter your password" 
                    setState={setPassword} 
                    value={password} 
                    error={error.password ?? ""}   
                />

                {/* Sumbit button */}
                <button type="submit" className={styles.submitBtn}>Log In</button>

                <div className={styles.hr}></div>

                {/* remember me component */}
                <RememberMe rememberMe={rememberMe} setRememberMe={setRememberMe} />    
                

                {/* navigation to the registration page */}
                <span>Don't Have account?  <Link to={"/register"}>Register</Link></span>
                
            </form>
        </div>        
    );
}