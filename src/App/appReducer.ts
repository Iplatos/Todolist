export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const InitialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,

}
type initialStateType = typeof InitialState

export const AppReducer = (state: initialStateType = InitialState, action: AppStatusType) => {

    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: "APP/SET-STATUS", status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: "APP/SET-ERROR", error} as const
}
export type AppStatusType = ReturnType<typeof setAppStatusAC> | ReturnType<typeof setAppErrorAC>