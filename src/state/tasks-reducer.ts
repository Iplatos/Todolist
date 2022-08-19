import {TasksStateType} from '../App';
import {TaskType} from "../Todolist";
import {v1} from "uuid";


export type RemoveTasksACType = ReturnType<typeof RemoveTasksAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>


type ActionsType = RemoveTasksACType |
    AddTodolistACType |
    addTaskACType |
    changeTaskStatusACType |
    changeTaskTitleACType |
    RemoveTodolistACType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id != action.tasksId)};
        case "ADD-TASK" :
            let newTask: TaskType = {id: "6", title: action.title, isDone: false}
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case "CHANGE-TASK-STATUS" :
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(el => el.id === action.tasksId ? {...el, isDone: action.isDone} : el)
            }
        case "CHANGE-TASK-TITLE" :
            return {
                ...state,
                [action.todolistId]:
                    state[action.todolistId].map(el => el.id === action.tasksId ? {...el, title: action.title} : el)
            }
        case "ADD-TODOLIST" :
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLISTS" :
           /* const {[action.id]: [], ...rest} = {...state}*/
            let copyState = {...state}
            return delete copyState[action.id]
        default:

            throw new Error("I don't understand this type")
    }
}

export const RemoveTasksAC = (tasksId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        tasksId, todolistId
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title, todolistId
    } as const
}
export const changeTaskStatusAC = (tasksId: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        tasksId, isDone, todolistId
    } as const
}
export const changeTaskTitleAC = (todolistId: string, tasksId: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        todolistId, tasksId, title
    } as const
}
export const AddTodolistAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TODOLIST",
        title, todolistId
    } as const
}
export const RemoveTodolistAC = (id:string) => {
    return {
        type: "REMOVE-TODOLISTS",
        id

    } as const
}
