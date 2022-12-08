import {AppStatusType, setAppErrorAC, setAppStatusAC} from "../App/appReducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handleServerNetworkError = (dispatch:Dispatch<AppStatusType>, message:string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC("succeeded"))
}
export const handleSeverAppError = <T>(dispatch:Dispatch<AppStatusType>, data:ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("title shoulb be less then 100 "))
    }
}
/// дженериковая функция. смотрим нам приходит дата реснопстайп.
// но у тудус и тасок разные свва. нужно указать в свве айтем этот тип.
// и передать перед вызовом.