require('dotenv').config()
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const routes = require("./routes.js");

mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'todo' }, (err) => {
    if (err) {
        console.error('Connection error', err);
        return
    } else {
        console.log("Database successfully connected!");
    }
})

const app = express();

const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// app.get("/api", (req, res) => {
//     res.json({"users": ["userOne", "userTwo", "userThree"]})
// })

app.use('/api', routes);

app.use(express.static('client/build'));

app.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})