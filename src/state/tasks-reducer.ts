import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setErrorAC, setErrorACType} from "./app-reducer";

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

export type updateTaskACActionType = {
    type: "UPDATE-TASK",
    todolistId: string
    taskId: string
    model: UpdateTaskModelType
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksType = {
    type:"SET-TASKS"
    tasks:TaskType[]
    todolistId:string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | updateTaskACActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | setTodolistType
    | SetTasksType

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
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.todolists.forEach(tl=>{copyState[tl.id]=[]})
            return copyState
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
         const stateCopy = {...state}
            const Alltask = stateCopy[action.todolistId]
            const newTask =  action.task
            const taskFithNew = [newTask, ...Alltask]
            stateCopy[action.todolistId] = taskFithNew
            return stateCopy;
        }

        case "UPDATE-TASK":{
            const todolistTask = state[action.todolistId]
            let newTaskArray = todolistTask.map(t=>t.id===action.taskId ? {...t, ...action.model}: t)
            state[action.todolistId] = newTaskArray
            return {...state}
        }
        /*   case 'CHANGE-TASK-STATUS': {
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
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TASKS":{
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState

        }
        default:
            return state;
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task:TaskType, todolistId:string): AddTaskActionType => {
    return {type: 'ADD-TASK', task, todolistId}
}
export const updateTaskAC = (taskId: string, model:UpdateDomainTaskModelType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
/*export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}*/
export const setTasksAC = (todolistId:string, tasks:TaskType[])=>{
    return {type: "SET-TASKS", todolistId, tasks }
}
export const setTasksTC = (todolistId:string, tasks:TaskType[])=> {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
    }
}
export const deleteTaskTC = (todolistId:string, taskId:string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)

            .then(res => dispatch(removeTaskAC(taskId, todolistId)))
    }
}
export const AddTaskTC = ( todolistId:string, title:string) => {
    return (dispatch: Dispatch<ActionsType | setErrorACType>) =>{
        todolistsAPI.createTask(todolistId, title)
            .then(res=> {
                {

                    if (res.data.resultCode === 0) {
                        dispatch(addTaskAC(res.data.data.item, todolistId))
                    } else {
                        if (res.data.messages.length){
                            dispatch(setErrorAC(res.data.messages[0]))
                        } else {
                            dispatch(setErrorAC("some erroeoeoeoeoeo"))
                        }
                    }
                }

                dispatch(addTaskAC(res.data.data.item, todolistId))})
    }
}
export const UpdateTask = (taskId:string, Domainmodel:UpdateDomainTaskModelType, todolistId:string) => {
    return (dispatch: Dispatch, getState:()=>AppRootStateType) =>{
        const state = getState()
       const task = state.tasks[todolistId].find(t=>t.id===taskId)
        if (task){
        const Apimodel:UpdateTaskModelType = {
            deadline: task.deadline,
            status:task.status,
            title:task.title,
            startDate:task.startDate,
            priority:task.priority,
            description:task.description,
                ...Domainmodel

        }
        todolistsAPI.updateTask(todolistId,taskId, Apimodel)
            .then(res=> {dispatch(updateTaskAC(taskId,Apimodel,todolistId  ))})
    }
}}


/*
санка это функция в которой разрешено делать сайд- эффекты, 2 параметра функцию диспатч и гет стэйт*/
