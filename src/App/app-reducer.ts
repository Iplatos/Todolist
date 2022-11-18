export type InitialStateType = {
    status: appStatusType
    error: string | null
}

export type appStatusType = "idle" | "loading" | "successed" | "failed"


const InitialState: InitialStateType = {
    status: "idle",
    error: null
}
type closeACType = ReturnType<typeof closeAC>
export type setErrorType = ReturnType<typeof setErrorAC>
export type setStatusType = ReturnType<typeof setStatusAC>

type ActionType = closeACType | setErrorType | setStatusType

export const appReducer = (state:InitialStateType = InitialState, action:ActionType)=>{
    switch (action.type){
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error:action.error}
        case "CLOSE" :
            return  {...state, error: action.error}
        default :
            return {...state}
    }
}

export const setStatusAC = (status:appStatusType) => {
    return {type: "APP/SET-STATUS", status} as const
}
export const setErrorAC = (error: string | null)=>{
    return {type:"APP/SET-ERROR", error } as const
}
export const closeAC = (error:string | null) => {
    return {type: "CLOSE", error} as const
}