// custom hook for each context we have

import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutsContext) // object with state and dispatch functions

    if (!context) { // simple check if the context is on scope
        throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
    }

    return context
}