export type InitialStateType = {
    status:RequestStatusType,
    error:string|null
}

export type RequestStatusType = "idle" | "loading" | "succesed" | "failed"

export type setErrorACType = ReturnType<typeof setErrorAC>
export type setStatusACType = ReturnType<typeof setStatusAC>

const InitialState:InitialStateType = {
    status:"idle",
    error:null
}

type AppActionsType = setErrorACType | setStatusACType

export const appReducer = (state:InitialStateType = InitialState, action:AppActionsType) =>{
    switch (action.type){
        case "APP/SET-STATUS" :
            return {...state, status:action.status}
        case "APP/SET_ERROR":
            return {...state, error:action.error}
        default:
            return state
    }
}

export const setErrorAC = (error:string | null)=> {
    return {type: "APP/SET_ERROR",error }as const
}
export const setStatusAC = (status:RequestStatusType)=> {
    return {type: "APP/SET-STATUS",status }as const
}



