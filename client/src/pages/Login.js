
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
        emailErr, 
        passwordErr, 
        setEmail, 
        setPassword, 
        setRememberMe, 
        submitEvent
    } = useFetchAuth("http://localhost:4000/api/v1/login");     // pss the POST URL to the hook

    return (
        <div className={styles.flexContainer}>

            <form className={styles.formContainer} onSubmit={submitEvent} > 
                
                {/* Form header */}
                <h1>Log In</h1>

                {/* Email auth input */}
                <AuthInput 
                    name="Email" 
                    type="email" 
                    placeholder="Enter your email" 
                    setState={setEmail} 
                    value={email}
                    error={emailErr}
                />

                {/* Password auth input */}
                <AuthInput 
                    name="Password" 
                    type="password" 
                    placeholder="Enter your password" 
                    setState={setPassword} 
                    value={password} 
                    error={passwordErr}   
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