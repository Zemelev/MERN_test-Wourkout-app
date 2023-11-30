import { useEffect, useState } from "react" //using react hooks to fench date from db

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {      // creating home page
    const [workouts, setWorkouts] = useState(null) // creating local states

    useEffect(() => {
        const fetchWorkouts = async () => { //fetching logic, async
            const response = await fetch('/api/workouts') // storing fetched response into object, using proxy for the address link(pacakge.json)
            const json = await response.json() // parcing json from the response object

            if (response.ok) { //checking if resposnce is ok, using personce metod
                setWorkouts(json) //parcing json to local state
            }
        }

        fetchWorkouts()
    }, []) //dependeces array, if empty fires function ones

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
