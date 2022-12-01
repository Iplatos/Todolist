import { Dispatch } from 'redux'
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../../app/app-reducer'
import {authApi} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}

        case "login/SET-IS-LOGGED-OUT":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions

export const setlogOutAC = (value:boolean)=>{
    return {type:'login/SET-IS-LOGGED-OUT', value}as const
}

export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: any) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.login(data)
        .then(res=> {
            console.log(res)
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        }).finally(()=>{

    })
}
export const logoutTC = () => (dispatch:Dispatch<ActionsType>) => {
    authApi.logout()
        .then(res=>{
            if (res.data.resultCode===0){
                dispatch(setIsLoggedInAC(false))
            }
        })
}

export const meTC = () => async (dispatch:Dispatch<ActionsType>) =>{
    try {
        const res = await authApi.me()
        if (res.data.resultCode===0){
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        }
    }catch (e){
        //@ts-ignore
        handleServerNetworkError(e,dispatch)
    }
}

// types
type ActionsType = ReturnType<typeof setlogOutAC> | ReturnType<typeof setIsLoggedInAC>| SetAppStatusActionType | SetAppErrorActionType
