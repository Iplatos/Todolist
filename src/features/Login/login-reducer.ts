import {Dispatch} from "redux";
import {authApi, LoginParamsType} from "../../api/todolists-api";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {addTaskAC} from "../TodolistsList/tasks-reducer";
import {AxiosError} from "axios";

const InitialState = {
    isLoggedIn: false as boolean
}

export type initialStateType = typeof InitialState

export const loginReducer = (state: initialStateType = InitialState, action: loginReducerActionType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

const setIsloggedAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}
export const LoginTC = (data: LoginParamsType) => (dispatch: Dispatch<loginReducerActionType | SetAppErrorActionType
    | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC("loading"))
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsloggedAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, dispatch)
        })
}

export type loginReducerActionType = ReturnType<typeof setIsloggedAC>