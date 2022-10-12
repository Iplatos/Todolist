import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8cf4078c-1ea5-4807-a2b5-794fda862abd"
    }
}

export type TodolistsType = {
    id: string,
    title: string
    addedDate: string
    order: number
}


type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data:D
}

export const todolistsApi = {
    getTodolists() {
        const promise = axios.get<Array<TodolistsType>>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
        return promise;
    },
    createTodolists(title: string) {
        const promise = axios.post<ResponseType<{ item: TodolistsType }>>("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, settings)
        return promise;
    },
    deleteTodolists(id: string) {
        const promise = axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/ ${id}`, settings)
        return promise;
    },
    updateTodolistTitle(id: string, title: string) {
        const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
        return promise
    },
    getTasks(todolistId:string){
        const promise = axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/ ${todolistId}/tasks`, settings)

return promise
    }
}