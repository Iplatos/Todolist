import {v1} from 'uuid';
import {AddTodolistActionType, fetchTodolistsACType, RemoveTodolistActionType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
   task:TaskType
}



type ActionsType = RemoveTaskActionType | AddTaskActionType

    | AddTodolistActionType
    | RemoveTodolistActionType
    | fetchTodolistsACType
    | ReturnType<typeof SetTaskAC>
    | ReturnType<typeof ChangeTaskStatusTitleAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "CHANGE-TASK-TITLE-STATUS": {
            const stateCopy ={...state}
            stateCopy[action.todolistId].map(el=>el.id===action.taskId ? {...el , ...action.model}: el)
        return stateCopy
        }
        case "SET-TASK": {
            const copyState = {...state}
            copyState[action.todolistId] = action.task
            return copyState
        }

        case "FETCH-TODOS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
           const CopyState = {...state}
            let allTasks = CopyState[action.task.todoListId]
            const NewTasks = [action.task, ...allTasks]
            CopyState[action.task.todoListId] = NewTasks
            return CopyState
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}
export const SetTaskAC = (todolistId: string, task: TaskType[]) => {
    return {type: "SET-TASK", todolistId, task} as const
}
export const getTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.getTasks(todolistId)
        .then(res => dispatch(SetTaskAC(todolistId, res.data.items)))
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistApi.deleteTask(todolistId, taskId)
        .then(res => dispatch(removeTaskAC(taskId, todolistId)))
}
export const addTaskAC = (task:TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const AddTaskTC =(todolistId:string, title:string)=>(dispatch:Dispatch)=>{
    todolistApi.postTask(todolistId,title)
        .then(res=> {
            dispatch(addTaskAC(res.data.data.item))
        })
}
export const ChangeTaskStatusTitleAC = (todolistId: string, taskId: string, model: forChangeModelType) => {
    return {type: "CHANGE-TASK-TITLE-STATUS", todolistId, taskId, model} as const
}
export const ChangeTaskStatusTitleTC = (todolistId: string, taskId: string, model: forChangeModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const TaskAll = getState().tasks
    const tasksFor = TaskAll[todolistId]
    const task = tasksFor.find(t => t.id === taskId)

    if (task) {

        const APImodel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        }

        todolistApi.putTasks(todolistId, taskId, APImodel)
            .then(res => dispatch(ChangeTaskStatusTitleAC(todolistId, taskId, APImodel)))
    }
}

type forChangeModelType = {
    title?: string
    description?: null | string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: null | string
    deadline?: null | string
}
