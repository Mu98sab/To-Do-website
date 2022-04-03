import { logoutAPI } from "../api/AuthApi";

export default function Dashboard(props) {
    
    const logout = async () => {  
        
       try{

            /*
                try to logout and pass the cookies which has the user id hashed inside the jwt token
            */
            await logoutAPI();

            // if logout successfully, referesh the page to reflect the changes 
            window.location.reload();   
        }
        catch (err) {
            // TODO: Delete the print and replace it with valid error message
            console.log(err);
        }
        
        
        
    };

    return (
        // To be replaced with the to do page soon
        <div style={{display: "flex", justifyContent: "center", alignItem: "center", width:"100%", height:"100%",minHeight:"100vh" }}>
            <button style={{margin:"auto"}} onClick={logout}>Logout</button>
        </div>
    );
}