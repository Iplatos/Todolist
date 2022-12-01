import {Dispatch} from "redux";
import {authApi} from "../api/todolists-api";
import {LoginActionType, setIsLoginIn} from "../features/Login/login-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    initialized: true
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, initialized: action.value}
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
    //true когда приложение проинициализировалось
    initialized: boolean
}
export const initializedAC = (value: boolean) => ({type: "APP/SET-IS-INITIALIZED", value} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export const InitializedAppTC = (value: boolean) => (dispatch: Dispatch<ActionsType>) => {
    authApi.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoginIn(true))

        }})
    dispatch(initializedAC(true))
        }

type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | ReturnType<typeof initializedAC>
    | LoginActionType
