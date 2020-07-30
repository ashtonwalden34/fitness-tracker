// requires mongoose to create schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema to hold exercise parameters
const exerciseSchema = new Schema(
    {
        // starts by getting date to allow user to enter workouts on different dates
        day: {
            type: Date,
            // defaults to current date
            default:() => Date.now()
        },
        // stores exercise information in an array to pass to database
        exercises: [
            {
                // string to hold type of workout (resistance or cardio)
                type: {
                    type: String,
                    trim: true,
                    required: "Enter type of exercise",
                }, 
                // string to hold name of workout
                name: {
                    type: String,
                    trim: true,
                    required: "Please name the exercise"
                },
                // number to hold number of minutes workout was performed
                duration: {
                    type: Number,
                    required: "Enter the amount of time taken for the exercise in minutes"
                },
                // number to hold weight of resistance workout
                weight: {
                    type: Number
                }, 
                // number to hold the number of reps of resistance workout
                reps: {
                    type: Number
                },
                // number to hold the number of sets of resistance workout
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    },
    {
        // parses virtaul properties to json
        toJSON: {
            // includes virtual properties | Not persisted to db
            virtuals: true
        }
    }
);

// Gets total time from workout by adding exercise times for stats page | Not stored in db
exerciseSchema.virtual("totalTime").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.time;
    }, 0);
});

// creates "workouts" collection in database and adds workoutSchema
const Workout = mongoose.model("Workout", exerciseSchema);
// exports workout object
module.exports = Workout;