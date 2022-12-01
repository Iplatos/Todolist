import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {authApi, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const InitialState = {
    isLoggedIn: false
}
type InitialStateType = typeof InitialState

export const loginReducer = (state: InitialStateType = InitialState, action: LoginActionType) => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default :
            return state
    }
}

export const setIsLoginIn = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value} as const
}
export const LogOutTC = () => (dispatch:Dispatch<LoginActionType>)=>{
authApi.logout()
    .then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoginIn(false))
            dispatch(setAppStatusAC("succeeded"))

        } else {
            handleServerAppError(res.data, dispatch)
        }
    }).catch((error) => {
    handleServerNetworkError(error, dispatch)
})
}


export const LoginTC = (data: LoginParamsType) => (dispatch: Dispatch<LoginActionType>) => {
    dispatch(setAppStatusAC("loading"))
    authApi.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoginIn(true))
                dispatch(setAppStatusAC("succeeded"))

            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
}
export type LoginActionType = ReturnType<typeof setIsLoginIn> | SetAppStatusActionType | SetAppErrorActionType