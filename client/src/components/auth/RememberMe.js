import styles from "../../styles/auth.module.css";

{/* 
    Remember me check box is not programmed yet, later on it will be user to check whether the user want to store the login for 2 weeks or want to remove the token after deleting the browser 
*/}
export default function RememberMe({rememberMe, setRememberMe}) {

    return (
        <div className={styles.rememberMe}>
            <input 
                className={styles.checkBoxInput}
                type="checkbox" 
                value={rememberMe} 
                onChange={ (event) => { setRememberMe(!rememberMe) } }
            />

            <span>{" "}Remember me</span>
        </div>
    );
}