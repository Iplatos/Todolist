import { v1 } from 'uuid';
import {Dispatch} from "redux";
import {todolistsAPI, TodolistType} from "../api/todolists-api";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
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
export type SetTodolistsType = {
    type: 'SET-TODOLISTS',
   todolists:TodolistType[]
}

export type FilterValuesType = 'all' | 'active' | 'completed';


export type TodolistDomainType = TodolistType & {filter:FilterValuesType}




type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsType

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: "",
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS" : {
            return action.todolists.map(el=>({...el,filter:"all"}))
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistsAC = (todolists:TodolistType[]):SetTodolistsType => {
return {type:"SET-TODOLISTS", todolists} as const
}
export const SetTodolistTC =()=> (dispatch:Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res=> {
                dispatch(setTodolistsAC(res.data))
            })
}
export const addTodolistTC =(title:string)=> {
    return (dispatch:Dispatch)=> {
        todolistsAPI.createTodolist(title)
            .then(res=>dispatch(addTodolistAC(title)))
    }
}
export const deleteTodolist = (todolistId:string)=> {
    return (dispatch:Dispatch)=> {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res=>dispatch(removeTodolistAC(todolistId)))
    }
}
export const changeTodolistTitleTC = (id:string, title:string) =>{
    return (dispatch:Dispatch)=> {
        todolistsAPI.updateTodolist(id,title)
            .then(res=> dispatch(changeTodolistTitleAC(id, title)))
    }
}
