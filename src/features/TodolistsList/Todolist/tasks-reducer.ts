import {AddTodolistActionType, fetchTodolistsACType, RemoveTodolistActionType} from './todolists-reducer';
import {TasksStateType} from '../../../App/App';
import {TaskType, todolistApi} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunk} from "../../../App/store";
import {setAppStatusAC} from "../../../App/appReducer";
import {handleServerNetworkError, handleSeverAppError} from "../../../utils/error-utils";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}


export type TasksActionType = RemoveTaskActionType | AddTaskActionType

    | AddTodolistActionType
    | RemoveTodolistActionType
    | fetchTodolistsACType
    | ReturnType<typeof SetTaskAC>
    | ReturnType<typeof ChangeTaskStatusTitleAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "CHANGE-TASK-TITLE-STATUS":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }

        case "SET-TASK": {
            const copyState = {...state}
            copyState[action.todolistId] = action.task
            return {...state, [action.todolistId]: action.task}
        }

        case "FETCH-TODOS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => stateCopy[tl.id] = [])
            return stateCopy
        }
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}

        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            return {...state, [action.id]: state[action.id].filter(el => el.id !== action.id)}
        }
        default:
            return state;
    }
}
export const SetTaskAC = (todolistId: string, task: TaskType[]) => {
    return {type: "SET-TASK", todolistId, task} as const
}
export const getTasksThunk = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistApi.getTasks(todolistId)
        .then(res => dispatch(SetTaskAC(todolistId, res.data.items)))
    dispatch(setAppStatusAC("succeeded"))
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch<AppActionsType>) => {
    try {
        dispatch(setAppStatusAC("loading"))
        let res = await todolistApi.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC(taskId, todolistId))
        dispatch(setAppStatusAC("succeeded"))
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
    }


}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const AddTaskTC = (todolistId: string, title: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        let res = await todolistApi.postTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
        } else {
            handleSeverAppError<{ item: TaskType }>(dispatch, res.data)
        }

    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)

    } finally {
        dispatch(setAppStatusAC("succeeded"))
    }


}
export const ChangeTaskStatusTitleAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: "CHANGE-TASK-TITLE-STATUS", todolistId, taskId, model} as const
}
export const ChangeTaskStatusTitleTC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType): AppThunk => (dispatch, getState: () => AppRootStateType) => {

    const TaskAll = getState().tasks
    const task = TaskAll[todolistId].find(t => t.id === taskId)


    if (task) {

        const APImodel = {
            title: task.title,
            description: task.description,
            completed: task.completed,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            id: task.id,
            todoListId: task.todoListId,
            order: task.order,
            addedDate: task.addedDate,
            ...model
        }
        dispatch(setAppStatusAC("loading"))
        todolistApi.putTasks(todolistId, taskId, APImodel)

            .then(res => dispatch(ChangeTaskStatusTitleAC(todolistId, taskId, APImodel)))
        dispatch(setAppStatusAC("succeeded"))
    }
}

type UpdateDomainTaskModelType = {
    title?: string
    description?: null | string
    completed?: boolean
    status?: number
    priority?: number
    startDate?: null | string
    deadline?: null | string
}
