//Schema 
// it defines the structure of particular doc in db
//Model
// it apply the Schema to a Model 
// use the model to interact with colection

const mongoose = require('mongoose')

const Schema = mongoose.Schema // using mongoose metod to create new schemas

const workoutSchema = new Schema({ // creatig new schema
    title: {
        type: String,
        required: true // reuired param
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true}) // automatialy adds 'create prparty stamp'

//imropting the Model 
module.exports = mongoose.model('Workout', workoutSchema) //autocreates Workouts collection based on schema
