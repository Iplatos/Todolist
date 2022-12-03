import axios, {AxiosResponse} from "axios";



const instance = axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1",
    withCredentials:true,
    headers: {
        'API-KEY': '04f2db45-e61a-4f29-bc7a-3f50712a6990',
    },
})

export const todolistApi = {
    getTodolist (){
       return instance.get<TodolistType[]>("/todo-lists")
    },
    postTodolist(title:string) {
        return instance.post<AxiosResponse,ResponseType<{item: TodolistType}>>("/todo-lists", {title})
    },
  deleteTodolist(todolistId:string){
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}`)
  },
    putTodolist(todolistId:string, title:string){
        return instance.put<AxiosResponse,ResponseType<{}>>(`/todo-lists/${todolistId}`, {title})
    },
    getTasks(todolistId:string){
        return instance.get<GetTaskResponse>(`/todo-lists/${todolistId}/tasks`)
    } ,
    putTasks(todolistId:string, taskId:string, model:UpdateTaskModelType){
        return instance.put<AxiosResponse<ResponseType<{}>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model )
    },
    deleteTask(todolistId:string, taskId:string){
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    postTask(todolistId:string, title:string){
        return instance.post<AxiosResponse<ResponseType<{item:TaskType }>>>(`/todo-lists/${todolistId}/tasks`, {title})
    }
}
export type TodolistType = {
        id: string,
        title: string,
        addedDate: string,
        order: number
    }

    type GetTaskResponse = {
    error:string | null
        totalCount:number
        items:TaskType[]
    }

type ResponseType<T> = {
    resultCode: number
    messages: string[],
    data: T
}
export enum TaskStatuses {
    New,
    InProgress,
    Completed,

}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}
export type TaskType ={
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title?: string
    description?: null
    completed?: boolean
    status?: number
    priority?: number
    startDate?: null
    deadline?: null
}