export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState:InitialAPPStateType = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

type InitialAPPStateType = {
    status:RequestStatusType
    error: null | string
}


export const appReducer = (state: InitialAPPStateType = initialState, action: AppActionsType): InitialAPPStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error:action.message}
        default:
            return state



    }

}


export const setAppStatusAC = (status:RequestStatusType)=> {
    return {type: 'APP/SET-STATUS',status} as const
}

export const setAppErrorAC = (message: null | string)=> {
    return { type:"APP/SET-ERROR", message} as const
}
export type setAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>


export type AppActionsType = setAppStatusACType | setAppErrorACType
