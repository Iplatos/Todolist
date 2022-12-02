import {Dispatch} from "redux";
import {authApi} from "../api/todolists-api";
import {setIsLoggedAC} from "../features/login/loginReducer";
import {handleServerAppError} from "../utils/error-utils";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "IS_INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setInitializedAC = (value: boolean) => ({type: "IS_INITIALIZED", value} as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else{
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error)=>{
            handleServerAppError(error, dispatch)
    }).finally(()=>{
        dispatch(setInitializedAC(true))
    })
}
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setInitializedACActionType = ReturnType<typeof setInitializedAC>

export type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | setInitializedACActionType
