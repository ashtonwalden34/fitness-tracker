// requires mongoose to create schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// schema to hold exercise parameters
const exerciseSchema = new Schema(
    {
        // starts by getting date to allow user to enter workouts on different dates
        day: {
            type: Date,
            // default:() => Date.now()
        },
        // stores exercie information in an array
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    requird: "Enter type of exercise"
                }, 
                name: {
                    type: String,
                    trim: true,
                    requird: "Please name the exercise"
                },
                time: {
                    type: Number,
                    requird: "Enter the amount of time taken for the exercise in minutes"
                },
                weight: {
                    type: Number
                }, 
                reps: {
                    type: Number
                },
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
        toJSON: {
            // includes virtual properties | Not persisted to db
            virtuals: true
        }
    }
);

// adds virtual property of total workout time
exerciseSchema.virtual("totalTime").get(function () {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.time;
    }, 0);
});

// creates "workouts" collection in database and adds workoutSchema
const Workout = mongoose.model("Workout", workoutSchema);
// exports workout object
module.exports = Workout;