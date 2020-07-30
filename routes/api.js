// requires router from express
const router = require("express").Router();

// requires Workout so it can connect to database
const Workout = require("../models/workout");

// post request to create workout
router.post("/api/workouts", (req, res) => {
    // creates workout based on "Workout" model parameters
    Workout.create({})
        // passes workout to database
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        // throws error if one is caught
        .catch(err => {
            res.json(err);
            console.log(err);
        });
});

// put request to update exercise array with new workouts
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
      params.id,
      // pushes new workout to exercie array
      { $push: { exercises: body }}
    )
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
        console.log(err);
      });
  });

// get request to retrieve workouts
// currently broken
router.get("/api/workouts", (req, res) => {
    // finds all workouts from database
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log("succesful - get workouts")
        })
        // throws error if one is caught
        .catch(err => {
            res.json(err);
            console.log(err);
        });
});

// finds workouts by range for stats page
router.get("/api/workouts/range", (req, res) => {
  // finds workouts for the last 7 days
  Workout.find({}).limit(7)
    .then(dbWorkouts => {
      console.log(dbWorkouts)
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});

// exports router object
module.exports = router;