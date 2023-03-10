import { setAppErrorAC, setAppStatusAC} from "../App/appReducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handleServerNetworkError = (dispatch:Dispatch, message:string) => {
    dispatch(setAppErrorAC({error:message}))
    dispatch(setAppStatusAC({status:"succeeded"}))
}
export const handleSeverAppError = <T>(dispatch:Dispatch, data:ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:"title should be less then 100 "}))
    }
}
/// дженериковая функция. смотрим нам приходит дата реснопстайп.
// но у тудус и тасок разные свва. нужно указать в свве айтем этот тип.
// и передать перед вызовом.