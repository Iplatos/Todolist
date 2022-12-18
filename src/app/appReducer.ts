import {AppThunk} from "./store";
import {authApi, TaskStatuses} from "../api/todolist-api";
import {handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC} from "../features/TodolistsList/Login/LoginReducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const InitialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    initialized: false as boolean

}

const slice = createSlice({
    name:"app",
    initialState:InitialState,
    reducers:{
        setAppStatusAC(state,action:PayloadAction<{status:RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state, action:PayloadAction<{error:string | null}>){
            state.error = action.payload.error
        },
        setInitializedAC(state,action:PayloadAction<{value:boolean}>){
            state.initialized = action.payload.value
        }
    }
})
export const AppReducer = slice.reducer
export const {setInitializedAC, setAppStatusAC, setAppErrorAC} = slice.actions




export const isInitializedTC = () => async (dispatch:Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    const res = await authApi.me()
    try {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}))

        } else {
            dispatch(setIsLoggedInAC({value:false}))
        }
        dispatch(setInitializedAC({value:true}))
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
    } finally {
        dispatch(setAppStatusAC({status:"succeeded"}))
    }
}

export const logOutTC = () => async (dispatch:Dispatch) => {

    const res = await authApi.logOut()
    dispatch(setIsLoggedInAC({value:false}))
}



