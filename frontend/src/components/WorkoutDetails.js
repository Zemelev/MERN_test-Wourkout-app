import { useWorkoutsContext } from '../hooks/useWorkoutsContext' //imporing our custom hook

//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {  //creating component with workout object properties
    const {dispatch} = useWorkoutsContext()

    const handleClick = async () => { //handling delete button click
        const response = await fetch('/api/workouts/' + workout._id, { // sending fetch request to the endpoint to fetch particular wourkout id
            method: 'DELETE' 
        })
        const json = await response.json() // geting response from db

        if (response.ok) { // response ok check
            dispatch({type: 'DELETE_WORKOUT', payload: json}) // dispatching action to update our context state
        }
    }
    
    
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            {/* <p>{workout.createdAt}</p> */}
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true})}</p>
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails //exporting component 