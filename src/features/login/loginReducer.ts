import {Dispatch} from "redux";
import {authApi, loginDataType} from "../../api/todolists-api";
import {ActionsType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState = {
    isLogged: false
}
type initialStateType =typeof initialState
export const LoginReducer = (state:initialStateType=initialState, action:loginActionType)=> {
    switch (action.type){
        case "SET/IS-Looged":
            return {...state, isLogged: action.value}
        default:
            return {...state}
    }
}

export const setIsLoggedAC = (value:boolean)=> {
    return {type:"SET/IS-Looged",value }as const
}
type loginActionType = ReturnType<typeof setIsLoggedAC>

export const LoginTC = (data:loginDataType) => (dispatch:Dispatch<loginActionType | ActionsType>)=> {
    dispatch(setAppStatusAC("loading"))
    authApi.login(data)
        .then(res=> {
            if (res.data.resultCode===0) {
                dispatch(setIsLoggedAC(true))
                dispatch(setAppStatusAC("succeeded"))
            }
        })
}
export const logoutTC = () => (dispatch: Dispatch<loginActionType | ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authApi.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
