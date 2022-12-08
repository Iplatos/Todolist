import {v1} from 'uuid';
import {FilterValuesType} from '../../../App/App';
import {todolistApi, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunk} from "../../../App/store";
import {ThunkAction} from "redux-thunk";
import {AppReducer, RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../../App/appReducer";
import {AxiosError} from "axios/index";
import {handleServerNetworkError, handleSeverAppError} from "../../../utils/error-utils";

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

export type TodolistDomainType = TodolistType & { filter: FilterValuesType } & { entityStatus: RequestStatusType }


export type TodolistsActionType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | fetchTodolistsACType
    | ReturnType<typeof setTodolistEntityStatusAC>

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {
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
}

export const setTodolistEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {type: "APP/SET-ENTITY-STATUS", todolistId, entityStatus} as const
}

export const fetchTodolistsAC = (todolists: TodolistType[]) => {
    return {type: "FETCH-TODOS", todolists} as const
}
// export const fetchTodolistsTC = ():AppThunk => (dispatch)=>{
//     todolistApi.getTodolist()
//         .then(res=>dispatch(fetchTodolistsAC(res.data)))
// }
export const fetchTodolistsTC = (): AppThunk => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    const res = await todolistApi.getTodolist()
    dispatch(fetchTodolistsAC(res.data))
    dispatch(setAppStatusAC("succeeded"))
}

export type fetchTodolistsACType = ReturnType<typeof fetchTodolistsAC>
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const removeTodolistTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(setTodolistEntityStatusAC(id, "loading"))
    todolistApi.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(id))
                dispatch(setAppStatusAC("succeeded"))
                dispatch(setTodolistEntityStatusAC(id, "idle"))
            } else {
                handleSeverAppError<{}>(dispatch, res.data)
                dispatch(setAppStatusAC("failed"))
            }
        }).catch((error: AxiosError) => {
        handleServerNetworkError(dispatch, error.message)
    })
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistApi.postTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(fetchTodolistsTC())
                dispatch(setAppStatusAC("succeeded"))
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
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistApi.putTodolist(todolistId, title)
        .then(res => dispatch(changeTodolistTitleAC(todolistId, title)))
    dispatch(setAppStatusAC("succeeded"))

}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

