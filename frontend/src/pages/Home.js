import { useEffect } from "react" //using react hooks to fench date from db
// import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext" //imporing our hook

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {      // creating home page
    // const [workouts, setWorkouts] = useState(null) // creating local states // no longer needed with our hook
    const {workouts, dispatch} = useWorkoutsContext() // using our custom hook

    useEffect(() => {
        const fetchWorkouts = async () => { //fetching logic, async
            const response = await fetch('/api/workouts') // storing fetched response into object, using proxy for the address link(pacakge.json)
            const json = await response.json() // parcing json from the response object

            if (response.ok) { //checking if resposnce is ok
                // setWorkouts(json) //parcing json to local state 
                dispatch({type: 'SET_WORKOUTS', payload: json}) // using dipatch func to fill up the workout array || it fires Reducer func and passes the action
            }
        }

        fetchWorkouts()
    }, [dispatch]) //dependeces array, if empty fires function ones

    return (
        <div className="home">
            <div className="workout">
                {workouts && workouts.map(workout => ( //runs if wourkouts not null
                    <WorkoutDetails key={workout._id} workout={workout}/> //using components, adding key properties and workout object
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home  //exporting home page
