import axios from 'axios'
import {TodolistType} from "../App";


const instance = axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        'API-KEY': "8cf4078c-1ea5-4807-a2b5-794fda862abd"
    },
})

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponceType>(
            `todo-lists/${todolistId}`,
            { title: title },
        )
    },
    deleteTodolist(todolistId:string){
return instance.delete<ResponceType>(`/todo-lists/${todolistId}`)
},
    getTodolist(){
        return instance.get<ResponceType[]>("/todo-lists")
    },
    createTodolist(title:string){
      return instance.post<ResponceType< {item: TodolistType}>>("/todo-lists", {title})
    },
    getTasks(todolistId:string){
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },
    addTask(title:string, todolistId:string){
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId:string,taskId:string,title:string){
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask(todolistId:string, taskId:string){
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}` )
}
}



type ResponceType<T = {}> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}


