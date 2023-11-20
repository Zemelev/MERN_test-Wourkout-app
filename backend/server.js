//loads environment variables to server.js, hiden on github, to anable run command (npm i dotenv)
require('dotenv').config()

const express = require('express')

//using mogoose: 
// mongoose is ODM library (Object data modeling) 
// wraps mogoose to allow to use metods to read and wirte db documents
// has a way to decline models and schemas
// strickt data structure
const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workout.js')

//express app
const app = express()

//midleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)  
    next()
})

//routes
app.use('/api/workout', workoutRoutes) // app routing 

//conect to db
mongoose.connect(process.env.MONG_URI) //acinhronus, conecting to db uri by the .env variable
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to DB and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


