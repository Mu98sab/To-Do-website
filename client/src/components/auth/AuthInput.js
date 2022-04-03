import styles from "../../styles/auth.module.css";


export default function AuthInput({name, value, setState, type, placeHolder, error}) {

    return (
        <>
            <label>{name}</label>
            <input 
                className={styles.authInput}
                type={type} 
                value={value} 
                placeholder={placeHolder} 
                onChange={ (event) => { setState(event.target.value) } }
            />
            <span className={styles.err}>{error}</span>
        </>
    );
}