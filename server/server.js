import express from "express";

const app = express();

// Testing 
app.get("/api/v1", (req, res) => {
    res.json({msg: "Hello, World"});
});

// start the server at port
app.listen(4000, () => {console.log("server start running at port 4000")});

