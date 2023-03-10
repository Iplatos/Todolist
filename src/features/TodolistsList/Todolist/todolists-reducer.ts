import {FilterValuesType} from '../../../App/App';
import {todolistApi, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../../App/appReducer";
import {AxiosError} from "axios/index";
import {handleServerNetworkError, handleSeverAppError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type fetchTodolistsACType = ReturnType<typeof fetchTodolistsAC>

export type TodolistDomainType = TodolistType & { filter: FilterValuesType } & { entityStatus: RequestStatusType }


/*export type TodolistsActionType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | fetchTodolistsACType
    | ReturnType<typeof setTodolistEntityStatusAC>*/

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: "todolistReducer",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            state[index].entityStatus = action.payload.entityStatus
        },
        fetchTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(el => ({...el, filter: "all", entityStatus: "idle"}))
        }

    },
})

export const todolistsReducer = slice.reducer
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistEntityStatusAC,
    fetchTodolistsAC
} = slice.actions


export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistApi.putTodolist(todolistId, title)
        .then(res => dispatch(changeTodolistTitleAC({todolistId: todolistId, title: title})))
    dispatch(setAppStatusAC({status: "succeeded"}))

}
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistApi.getTodolist()
        .then(res => {
            dispatch(fetchTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: "succeeded"}))

        }).catch((error) => {
        handleServerNetworkError(dispatch, error.message)
        dispatch(setAppStatusAC({status: "failed"}))
    })

}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(setTodolistEntityStatusAC({todolistId: id, entityStatus: "loading"}))
    todolistApi.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC({todolistId: id}))
                dispatch(setAppStatusAC({status: "succeeded"}))
                dispatch(setTodolistEntityStatusAC({todolistId: id, entityStatus: "idle"}))
            } else {
                handleSeverAppError<{}>(dispatch, res.data)
                dispatch(setAppStatusAC({status: "failed"}))
            }
        }).catch((error: AxiosError) => {
        handleServerNetworkError(dispatch, error.message)
        dispatch(setAppStatusAC({status: "failed"}))
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistApi.postTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleSeverAppError<{ item: TodolistType }>(dispatch, res.data)

            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        }).finally(()=>{
        dispatch(setAppStatusAC({status: "failed"}))
    })
}

/*
export const setTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {type: "APP/SET-ENTITY-STATUS", todolistId, entityStatus} as const
}

export const fetchTodolistsAC = (todolists: TodolistType[]) => {
    return {type: "FETCH-TODOS", todolists} as const
}

export const fetchTodolistsTC = () =>  (dispatch:Dispatch) => {
    dispatch(setAppStatusAC({status:"loading"}))
    todolistApi.getTodolist()
        .then(res=> {
            dispatch(fetchTodolistsAC(res.data))
            dispatch(setAppStatusAC({status:"succeeded"}))

        } ).catch((error)=>{
        handleServerNetworkError(dispatch, error.message)
    })

}

export type fetchTodolistsACType = ReturnType<typeof fetchTodolistsAC>
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const removeTodolistTC = (id: string) => (dispatch:Dispatch) => {
    dispatch(setAppStatusAC({status:"loading"}))
    dispatch(setTodolistEntityStatusAC(id, "loading"))
    todolistApi.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(id))
                dispatch(setAppStatusAC({status:"succeeded"}))
                dispatch(setTodolistEntityStatusAC(id, "idle"))
            } else {
                handleSeverAppError<{}>(dispatch, res.data)
                dispatch(setAppStatusAC({status:"failed"}))
            }
        }).catch((error: AxiosError) => {
        handleServerNetworkError(dispatch, error.message)
    })
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const addTodolistTC = (title:string) => (dispatch:Dispatch) => {
    dispatch(setAppStatusAC({status:"loading"}))
    todolistApi.postTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC({status:"succeeded"}))
            } else {
                handleSeverAppError<{ item: TodolistType }>(dispatch, res.data)

            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(dispatch, error.message)
        })
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch:Dispatch) => {
    dispatch(setAppStatusAC({status:"loading"}))
    todolistApi.putTodolist(todolistId, title)
        .then(res => dispatch(changeTodolistTitleAC(todolistId, title)))
    dispatch(setAppStatusAC({status:"succeeded"}))

}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
*/

/*export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "APP/SET-ENTITY-STATUS":
            return state.map(tl => tl.id === action.todolistId ? {...tl, entityStatus: action.entityStatus} : tl)
        case "FETCH-TODOS" :
            return action.todolists.map(el => ({...el, filter: "all", entityStatus: "idle"}))

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: "all", entityStatus: "idle"}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {

            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }
        default:
            return state;
    }
}*/



