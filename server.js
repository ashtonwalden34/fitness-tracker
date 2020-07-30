// requires express and mongoose
const express = require("express");
const mongoose = require("mongoose");

// looks for open port or defaults to 8000
const PORT = process.env.PORT || 8000;

// variable to hold express
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// serves static files through public folder
app.use(express.static("public"));

// connects to workouts db
mongoose.connect(process.env.MONGODB_URI || 
    "mongodb://user:user123@ds031213.mlab.com:31213/heroku_fkkdtnds", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// requires routes from route folder
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

// listens to port and alerts the user if succesful
app.listen(PORT, function(){
    console.log("app listening on port: " + PORT);
});