import {AppActionsType, setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";


export const HandleServerNetworkError = () => (dispatch: ErrorDispatchType, err: { message: string }) => {
    dispatch(setAppStatusAC("failed"))
    dispatch(setAppErrorAC(err.message))
}

export const HandleServerAppError = <T>(dispatch:ErrorDispatchType, data:ResponseType<T>)=>{
    if (data.messages[0]){
dispatch(setAppErrorAC(data.messages[0]))
    }else{
        dispatch(setAppErrorAC("someError"))
    }
    dispatch(setAppStatusAC("failed"))
}

type ErrorDispatchType = Dispatch<AppActionsType>
