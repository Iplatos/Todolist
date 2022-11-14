import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./app-reducer";


let startState:InitialStateType


beforeEach(()=>{
    startState={
        error: null,
        status : "idle"
    }
})
test("first test name", ()=>{
    const endState = appReducer(startState, setErrorAC("Some Error"))

    expect(endState.error).toBe("Some Error")
})
test ("test second name ",()=>{
    const endState = appReducer(startState, setStatusAC( "succesed" ))
})


