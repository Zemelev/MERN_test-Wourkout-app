const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) => {
    const workout = await Workout.find({}).sort({createdAt: -1}) // all wourkouts layed by the creation time

    res.status(200).json(workout) //sending your workouts in json
}

//get a single workout
const getWorkout = async (req,res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {                 // checking if the id valid using mongoose
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {                                              // if we don`t have a wourkout throw an error
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)  //sending your workouts in json
}

//create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body    
    
    // add doc to db
    try {
        const workout = await Workout.create({title, load, reps}) //using an imported Model with .create metod || saving newly created doc with id
        res.status(200).json(workout) //sending responce with doc in json
    } catch (error) {
        res.status(400).json({error: error.message}) //sending error in json
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params //taking an id from requrst object

    if (!mongoose.Types.ObjectId.isValid(id)) {                 // checking if the id valid using mongoose
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findByIdAndDelete({_id: id}) //in mongodb property name(id) is _id

    if (!workout) {                                             // if we don`t have a wourkout throw an error
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)     //sending your workouts in json
}

//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params //taking an id from requrst object

    if (!mongoose.Types.ObjectId.isValid(id)) {                 // checking if the id valid using mongoose
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body //spreadind object proreties to the update object
    })

    if (!workout) {                                             // if we don`t have a wourkout throw an error
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)       //sending your workouts in json

}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}