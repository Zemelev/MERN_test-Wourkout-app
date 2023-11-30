import { useState } from "react"

const WorkoutForm = () => {
    const [title, setTitle] = useState('') // creating states for each property in the form
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => { // form submit func (e = event object)
        e.preventDefault() // preventing default behavior, it will NOT refresh the page after submition

        const workout = {title, load, reps} // filling out the body of the request

        const response = await fetch('/api/workouts', {  //using fetch api to send POST request
            method: 'POST', //specifing the method
            body: JSON.stringify(workout), // turning object into a json string and sending it as a body
            headers: { 
                'Content-Type': 'application/json' // defining contenttbype as json
            }
        }) 
        const json = await response.json() // geting json back from response from workoutControler

        if (!response.ok) {
            setError(json.error)
        } 
        if (response.ok) {
            setTitle('') //reseting form states
            setLoad('')
            setReps('')
            setError(null) // if where was an error seting it to null
            console.log('new workout added:', json)
        }
    }
    
    return ( //tracking what user typing into the form and storing it in states 
        <form className="create" onSubmit={handleSubmit}> 
            <h3>Add a New Workout</h3> 

            <label>Exersize Title:</label>
            <input 
                type="text"
                onChange={(e) => setTitle(e.target.value)} // firing func that sets title with the entering values
                value={title} // seting the value of the import to be the state value
            />

            <label>Load (in kg):</label>
            <input 
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
            />
            <label>Number of Reps:</label>
            <input 
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>} 
        </form>
    )
}

export default WorkoutForm