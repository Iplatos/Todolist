import {AppThunk} from "./store";
import {authApi} from "../api/todolist-api";
import {handleServerNetworkError} from "../utils/error-utils";
import {AxiosError} from "axios";
import {setIsLoggenInAC} from "../features/TodolistsList/Login/LoginReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const InitialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    initialized: false as boolean

}
type initialStateType = typeof InitialState

export const AppReducer = (state: initialStateType = InitialState, action: AppStatusType) => {

    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "SET-INITIALIZED":
            return {...state, initialized: action.value}
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
export const setInitializedAC = (value: boolean) => {
    return {type: "SET-INITIALIZED", value} as const
}

export const isInitializedTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    const res = await authApi.me()
    try {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggenInAC(true))

        } else {
            dispatch(setIsLoggenInAC(false))
        }
        dispatch(setInitializedAC(true))
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }
}

export const logOutTC = (): AppThunk => async (dispatch) => {

    const res = await authApi.logOut()
    dispatch(setIsLoggenInAC(false))
}

export type AppStatusType = ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setInitializedAC>
