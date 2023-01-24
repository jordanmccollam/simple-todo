const express = require("express");
const app = express();

const PORT = 8000;

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})