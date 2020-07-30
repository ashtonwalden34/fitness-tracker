// requires router and path to create routes for exercie and stats page
const router = require("express").Router();
const path = require("path");

// get request to route to exercise page from current directory
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

// get request to route to stats page from current directory
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

// exports router object
module.exports = router;