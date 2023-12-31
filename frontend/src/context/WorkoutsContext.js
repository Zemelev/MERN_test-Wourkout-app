// context provided component

import { createContext, useReducer } from "react" //importing func from react

export const WorkoutsContext = createContext() // creating brand new context

export const workoutsReducer = (state, action) => { //creating reducer func | take 2 args => the previous state and action( the object that we pass to the dispatch func)
    switch (action.type) { // seting cases for diferent action types
        case 'SET_WORKOUTS': // in case we want to fetch all workouts
            return {
                workouts: action.payload // returning an array of all workouts
            }
        case 'CREATE_WORKOUT': // in case we wants to update newly created one and fetch all workouts  
            return {
                workouts: [action.payload, ...state.workouts] // returning new workout first and the rest of workouts
            }
        case 'DELETE_WORKOUT': // in case we want to delete workout
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id) // returning all workouts accept the wourkout we delete
            }
        default:
            return state // returning the unchanged state
    }
}

// creating new react component
export const WorkoutsContextProvider = ({ children }) => { // distruct the child property from the props in this component
    // children prop represent what the main component wraps (in our case its an App at index.js file)
   
    const [state, dispatch] = useReducer(workoutsReducer, { // using Reducer hook and adding inital value for the state
        workouts: null // if updated will go to whatever action.payload is ( the entire erray from the server )
    })

    // dispatch({type: 'SET_WORKOUTS', payload: [{}, {}]}) // called an action | first we pass an object as an argument, type property describes the state change | a payload property represents any data we need to change to make this change
   
    return ( //returning template, wraping it with provider so every component of app can acces context
    // wtih value prop we passing danamic value to any component using state and dispatch func to update the state
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}