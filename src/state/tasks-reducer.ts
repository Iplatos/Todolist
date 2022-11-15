import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status:TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: "SET-TASKS"
    tasks:TaskType[]
    todolistId:string
}

type updateTaskACType = ReturnType<typeof updateTaskAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTasksActionType
    | SetTodolistsType
    |updateTaskACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "SET-TODOLISTS":{
            const copyState = {...state}
            action.todolists.forEach(t=> copyState[t.id] = [])
            return copyState
        }

        case "SET-TASKS": {
            const copyState = {...state}
                copyState[action.todolistId] = action.tasks
            return copyState
        }

case "UPDATETASK" : {
    const copyState = {...state}
    const tasks= copyState[action.todolistId].map(el=> el.id===action.taskId ? {...el, ...action.model} : el)
   copyState[action.todolistId] = tasks

    return copyState

}
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
         const copyState = {...state}
            const task = action.task
            const tasks = copyState[action.task.todoListId]
            copyState[action.task.todoListId] = [task, ...tasks]
            return copyState
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
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

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, task:TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', title, task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks:TaskType[], todolistId:string):SetTasksActionType => {
    return {type: "SET-TASKS" , todolistId,tasks}
}
export const updateTaskAC = (taskId: string, model:UpdateTaskModelType, todolistId: string) => {
    return {type:"UPDATETASK",taskId,  model, todolistId } as const
}

export const setTasksTC = (todolistId:string)=> {
    return (dispatch:Dispatch)=>{
        todolistsAPI.getTasks(todolistId)
            .then(res=> {
                dispatch(setTasksAC(res.data.items,todolistId))
            })
    }
}
export const addTaskTC = (title: string, todolistId: string)=>{
    return (dispatch:Dispatch) =>{
        todolistsAPI.createTask(todolistId,title)
            .then(res=> dispatch(addTaskAC(title, res.data.data.item)))
    }
}
export const deleteTaskTC = (todolistId:string, taskId:string) => {
    return (dispatch:Dispatch) =>{
        todolistsAPI.deleteTask(todolistId,taskId)
            .then(res => dispatch(removeTaskAC(taskId,todolistId)))
    }
}
export type UpdateDomainTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const changeTaskTC = (todolistId:string, DomainModel:UpdateDomainTaskType, taskId:string)=>{
    return (dispatch:Dispatch, getState:()=>AppRootStateType)=> {
        const state = getState().tasks
        const task = state[todolistId].find(el=>el.id===taskId)
        if (task){
            const APImodel: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...DomainModel
            }



        todolistsAPI.updateTask(todolistId,taskId, APImodel)
            .then(res=>dispatch(updateTaskAC(taskId, APImodel, todolistId)))

    }
}
}


