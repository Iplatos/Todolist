import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

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
    type: "SET-TODOS",
    todos: TodolistType[]
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case "SET-TODOS":
            return action.todos.map(t=>({...t,filter:"all"}))

        case 'ADD-TODOLIST': {
            return [{
                id: v1(),
                title: action.title,
                filter: 'all',
                addedDate: '',
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
export const setTodolists = (todos: TodolistType[]) => {
    return {type: "SET-TODOS", todos}

}
export const getTodoTC = () => (dispatch:Dispatch)=>{
    todolistsAPI.getTodolists().then((res) => {
        const data = res.data
        dispatch(setTodolists(data))

        }
    )
}
export const ChangeTodoTitle = (todolistId:string, title:string) => {
    return (dispatch: Dispatch, getState:()=>AppRootStateType)=>{
        const todos = getState().todolists
      const changed = todos.find(el=>el.id===todolistId)
        if (changed) {
            todolistsAPI.updateTodolist(todolistId, title)
                .then(res => dispatch(changeTodolistTitleAC(changed.id, title)))
        }
    }
}
export const createTodolistTC = (title:string)=>(dispatch:Dispatch, getState:()=>AppRootStateType)=> {
    todolistsAPI.createTodolist(title)
        .then(res=>dispatch(addTodolistAC(res.data.data.item.title)))
}
export const deleteTodolist = (todolistID:string) => (dispatch:Dispatch)=>{
    todolistsAPI.deleteTodolist(todolistID)
        .then(res=> dispatch(removeTodolistAC(todolistID)))
}