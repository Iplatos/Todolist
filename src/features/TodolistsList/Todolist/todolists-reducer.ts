import { v1 } from 'uuid';
import { FilterValuesType } from '../../../App/App';
import {todolistApi, TodolistType} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunk} from "../../../App/store";
import {ThunkAction} from "redux-thunk";

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

export type TodolistDomainType = TodolistType & { filter: FilterValuesType }


export type TodolistsActionType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | fetchTodolistsACType

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "FETCH-TODOS" :
            return action.todolists.map(el=>({...el, filter:"all"}))

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter:"all"}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl=> tl.id===action.id ? {...tl, title:action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {

            return state.map(tl=> tl.id===action.id ? {...tl, filter:action.filter} : tl)
        }
        default:
            return state;
    }
}

export const fetchTodolistsAC = (todolists:TodolistType[])=>{
    return {type: "FETCH-TODOS", todolists}as const
}
// export const fetchTodolistsTC = ():AppThunk => (dispatch)=>{
//     todolistApi.getTodolist()
//         .then(res=>dispatch(fetchTodolistsAC(res.data)))
// }
export const fetchTodolistsTC = ():AppThunk => async (dispatch)=>{
    const res = await todolistApi.getTodolist()
    dispatch(fetchTodolistsAC(res.data))
}

export type fetchTodolistsACType = ReturnType<typeof fetchTodolistsAC>
export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const removeTodolistTC = (id:string):AppThunk => (dispatch)=>{
    todolistApi.deleteTodolist(id)
        .then(res=>dispatch(removeTodolistAC(id)))
}
export const addTodolistAC = (todolist:TodolistType) => {
    return {type: 'ADD-TODOLIST',todolist} as const
}
export const addTodolistTC = (title:string): AppThunk => (dispatch)=>{
    todolistApi.postTodolist(title)
        .then(res=>dispatch(fetchTodolistsTC()))
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistTitleTC = (todolistId:string, title:string):AppThunk => (dispatch)=>{
    todolistApi.putTodolist(todolistId, title)
        .then(res=>dispatch(changeTodolistTitleAC(todolistId,title)))


}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

