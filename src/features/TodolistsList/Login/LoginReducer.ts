import {setAppStatusAC} from "../../../App/appReducer";
import {authApi, LoginParamsType} from "../../../api/todolist-api";
import {AppThunk} from "../../../App/store";
import {handleServerNetworkError, handleSeverAppError} from "../../../utils/error-utils";
import {AxiosError} from "axios";


const initialState = {
    isLogedIn: false as boolean
}
export type AppLoginType = ReturnType<typeof setIsLoggenInAC>


export const LoginReducer = (state: typeof initialState = initialState, action: AppLoginType) => {
    switch (action.type) {
        case "IS-LOGGED-IN": {
            return {...state, isLogedIn: action.value}
        }
        default:
            return {...state}

    }

}


export const setIsLoggenInAC = (value: boolean) => {
    return {type: "IS-LOGGED-IN", value} as const
}

export const loginTC = (data: LoginParamsType): AppThunk =>
    async (dispatch) => {
        dispatch(setAppStatusAC("loading"))
        const res = await authApi.login(data)
        try {
            if (res.data.resultCode == 0) {
                dispatch(setIsLoggenInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleSeverAppError(dispatch, res.data)
            }

        } catch (e: any) {
            handleServerNetworkError(dispatch, e.message)

        }

    }