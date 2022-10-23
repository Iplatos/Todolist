import axios from 'axios'
import {FilterValuesType} from "../state/todolists-reducer";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1",
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': "8cf4078c-1ea5-4807-a2b5-794fda862abd",
    },

})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        const promise = instance.put<SuperType<{}>>(
            `todo-lists/${todolistId}`,
            {title: title},
        )
        return promise
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<SuperType<{}>>(`todo-lists/${todolistId}`)
        return promise
    },

    getTodolist() {
        const promise = instance.get<TodolistType[]>(`todo-lists`)
        return promise

    },
    createTodolist(title: string) {
        const promise = instance.post<SuperType<{ item: TodolistType }>>(`todo-lists`, {title})
        return promise
    },
    getTasks(todolistId: string) {
        const promise = instance.get(`/todo-lists/${todolistId}/tasks`)
        return promise
    },
    createTask(todolistId: string, title: string) {
        const promise = instance.post(`/todo-lists/${todolistId}/tasks`, {title})
        return promise
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        const promise = instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
        return promise
    },
    deletetask(todolistId: string, taskId: string) {
        const promise = instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    }
}


export  type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
    filter:FilterValuesType
}
type ResponseType = {
    fieldsErrors: string[]
    resultCode: number
    messages: string[],
    data: {
        item: TodolistType
    }
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string

}


type SuperType<T> = {
    "messages": string[]
    "fieldsErrors": string[]
    "resultCode": number
    data: T
}