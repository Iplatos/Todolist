import {
    addTodolistAC,
    AddTodolistActionType,
    fetchTodolistsAC,
    fetchTodolistsACType,
    removeTodolistAC,
    RemoveTodolistActionType,
} from './todolists-reducer';
import {TasksStateType} from '../../../App/App';
import {TaskType, todolistApi} from "../../../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../../App/store";
import {setAppStatusAC} from "../../../App/appReducer";
import {handleServerNetworkError, handleSeverAppError} from "../../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


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


const slice = createSlice({
    name: "taskReducer",
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        ChangeTaskStatusTitleAC(state, action: PayloadAction<{ todolistId: string, taskId: string, model: UpdateDomainTaskModelType }>) {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        },

        SetTaskAC(state, action: PayloadAction<{ todolistId: string, task: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.task
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
        builder.addCase(fetchTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            });
        })

    }
})


export const tasksReducer = slice.reducer
export const {SetTaskAC, ChangeTaskStatusTitleAC, addTaskAC, removeTaskAC} = slice.actions

export const getTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistApi.getTasks(todolistId)
        .then(res => {
            dispatch(SetTaskAC({todolistId, task: res.data.items}))

            dispatch(setAppStatusAC({status: "succeeded"}))
        }).catch((error) => {
        handleServerNetworkError(dispatch, error.message)
        dispatch(setAppStatusAC({status: "failed"}))
    })

}
export const AddTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        let res = await todolistApi.postTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC({task: res.data.data.item}))
        } else {
            handleSeverAppError<{ item: TaskType }>(dispatch, res.data)
        }

    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)

    } finally {
        dispatch(setAppStatusAC({status: "succeeded"}))
    }


}
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: "loading"}))
        let res = await todolistApi.deleteTask(todolistId, taskId)
        dispatch(removeTaskAC({taskId, todolistId}))
        dispatch(setAppStatusAC({status: "succeeded"}))
    } catch (error: any) {
        handleServerNetworkError(dispatch, error.message)
        dispatch(setAppStatusAC({status: "failed"}))
    }


}
export const ChangeTaskStatusTitleTC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
        dispatch(setAppStatusAC({status: "loading"}))
        todolistApi.putTasks(todolistId, taskId, APImodel)

            .then(res => dispatch(ChangeTaskStatusTitleAC({todolistId, taskId, model: APImodel})))
        dispatch(setAppStatusAC({status: "succeeded"}))
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
