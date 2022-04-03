import useFetchAuth from "../utils/hooks/useFetchAuth";
import styles from "../styles/auth.module.css";
import AuthInput from "../components/auth/AuthInput";
import { Link } from "react-router-dom";
import RememberMe from "../components/auth/RememberMe";


export default function Register(props) {

    // use the fetch auth hook which contain all the states and their setters along with the event of submit
    const {email, password, rememberMe, emailErr, passwordErr, setEmail, setPassword, setRememberMe, submitEvent} = useFetchAuth("http://localhost:4000/api/v1/register");

    
    return (
        <div className={styles.flexContainer}>

            <form className={styles.formContainer} onSubmit={submitEvent} > 
                
                {/* Form header */}
                <h1>Register</h1>
                

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