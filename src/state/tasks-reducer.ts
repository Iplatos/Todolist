import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
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
    todolistId:string
}

/*export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    task: TaskType
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}*/
export type UpdateTaskActionType = {
    type: "UPDATE-TASK"
    todolistId: string
    taskId: string
    task:TaskType
}
export type setTasksACType = ReturnType<typeof setTasksAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType
/*    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType*/
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsType
    | setTasksACType
    | UpdateTaskActionType



const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {


        case "SET-TASKS" : {
            return {...state, [action.todoId]: action.tasks}
        }
        case "UPDATE-TASK" :
            return {...state,[action.todolistId]: state[action.todolistId].map(el=>el.id===action.taskId ? {...el, ...action.task} : el)}
        case "SET-TODOS" :{
             const CopyState = {...state}
            action.todos.forEach((el)=>{
                CopyState[el.id] = []
                }
            )
            return CopyState
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
           return {...state,[action.todolistId]: [...state[action.todolistId], action.task]}

        }
      /*  case 'CHANGE-TASK-STATUS': {
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
        }*/

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
export const addTaskAC = (task:TaskType, todolistId:string): AddTaskActionType => {
    return {type: 'ADD-TASK', task, todolistId}
}
export const updateTaskAC = (taskId: string, task:TaskType, todolistId: string):UpdateTaskActionType  => {
    return {type: "UPDATE-TASK", task, todolistId, taskId}
}
/*export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}*/

export const setTasksAC = (todoId:string,tasks:TaskType[])=> {
    return {type: "SET-TASKS",todoId, tasks}as const
}

export const fetchTC = (todoId:string)=>{
    return (dispatch:Dispatch)=>{
        todolistsAPI.getTasks(todoId)
            .then(res=>dispatch(setTasksAC(todoId,res.data.items)))
    }
}
export const deleteTasksTC = (todoID:string, TaskId:string)=>{
    return (dispath:Dispatch)=>{
        todolistsAPI.deleteTask(todoID,TaskId)
            .then(res=> dispath(removeTaskAC(TaskId,todoID)) )
    }
}
export const addTaskTC = (todolistId:string, title:string) => (dispath:Dispatch)=> {
    todolistsAPI.createTask(todolistId, title)
        .then(res=>dispath(addTaskAC(res.data.data.item, todolistId)))
}
/*export const changeTaskstatusTC = (todolistID:string, status:TaskStatuses, taskId:string) =>{
    return (dispatch:Dispatch, getState:()=>AppRootStateType)=>{
     const task = getState().tasks[todolistID].find(el=>el.id===taskId)
        if (task) {
            const model:UpdateTaskModelType = {
                ...task, status
            }
todolistsAPI.updateTask(todolistID,taskId,model)
    .then(res => dispatch(changeTaskStatusAC(taskId,res.data.data.item.status, todolistID)))
        }


    }
}*/
/*export const changeTaskTitleTC  = (todolistId:string, taskId:string, title:string)=>{
    return (dispatch:Dispatch, getState:()=>AppRootStateType)=>{
        const task = getState().tasks[todolistId].find(el=>el.id===taskId)
        if (task){
            const model:UpdateTaskModelType = {
                ...task, title
            }
            todolistsAPI.updateTask(todolistId,taskId,model)
                .then(res=>dispatch(changeTaskTitleAC(taskId,res.data.data.item.title,todolistId)))
        }
    }
}*/
export type UpdateTaskType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (todolistId:string, taskId:string, value:UpdateTaskType) =>
    (dispatch:Dispatch, getState:()=>AppRootStateType)=> {
        const task = getState().tasks[todolistId].find(el => el.id === taskId)
        if (task) {
            const model: UpdateTaskModelType = {
                ...task, ...value
            }
            todolistsAPI.updateTask(todolistId,taskId,model)
                .then((res)=>{
                    const updatedTask = res.data.data.item
                    dispatch(updateTaskAC(taskId,updatedTask, todolistId))})
        }

    }

