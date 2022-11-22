import {AxiosError} from "axios";
import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";


export const HandleServerNetworkError = () => (dispatch:ErrorUtilsType, err:AxiosError) => {
dispatch(setAppErrorAC(err.message))
dispatch(setAppStatusAC("failed"))
}
export const HandleServerAppError = <T>(dispatch:ErrorUtilsType, data:ResponseType<T>) =>{
    if (data.messages){
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("someerror"))
    }
    dispatch(setAppStatusAC("failed"))
}


type ErrorUtilsType = Dispatch<AppActionsType>