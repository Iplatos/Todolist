import {setAppStatusAC} from "../../../App/appReducer";
import {authApi, LoginParamsType} from "../../../api/todolist-api";
import {handleServerNetworkError, handleSeverAppError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";


const initialState = {
    isLogedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState:initialState,
    reducers:{
        setIsLoggedInAC(state,action:PayloadAction<{ value: boolean }>){
            state.isLogedIn=action.payload.value
        }

    }
})


export const loginReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions


export const loginTC = (data: LoginParamsType) =>
    async (dispatch:Dispatch) => {
        dispatch(setAppStatusAC({status:"loading"}))
        const res = await authApi.login(data)
        try {
            if (res.data.resultCode == 0) {
                dispatch(setIsLoggedInAC({value:true}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleSeverAppError(dispatch, res.data)
            }

        } catch (e: any) {
            handleServerNetworkError(dispatch, e.message)

        }

    }