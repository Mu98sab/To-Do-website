import React, {useEffect, useState} from "react";


function App() {

  // Testing code 
  const [serverMsg, setServerMsg] = useState("");

  useEffect( () => {

    async function fetchAPI() {
      try {
        const res = await fetch("/api/v1");
        const {msg} = await res.json();
  
        setServerMsg(msg);
      }
      catch (err) {
        console.log(err);
      }
    }
    fetchAPI();
  }, []);

  return (
    <div>
      {serverMsg}
    </div>
  );
}

export default App;