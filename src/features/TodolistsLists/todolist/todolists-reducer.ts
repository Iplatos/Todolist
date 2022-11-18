import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../../../api/todolists-api'
import {Dispatch} from "redux";


type ActionsType =

    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof addTodolistAC>

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

        case "SET-TODOLISTS":
            return action.todolists.map(el => ({...el, filter: "all"}))

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{...action.todolist, title: action.title, filter: "all"}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el=>el.id===action.id ? {...el, title:action.title} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el=>el.id===action.id? {...el, filter:action.filter} : el)
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}as const
}
export const addTodolistAC = (title: string, todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', title: title, todolist}as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: "SET-TODOLISTS", todolists} as const
}
export const setTodolistsTC = (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTodolist(title)
        .then(res => dispatch(addTodolistAC(title, res.data.data.item)))
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => dispatch(removeTodolistAC(todolistId)))
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => dispatch(changeTodolistTitleAC(todolistId, title)))
}