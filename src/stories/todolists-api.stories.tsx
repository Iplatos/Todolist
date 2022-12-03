import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/todolist-api";
import {instance} from "@storybook/node-logger";

export default {
    title: 'API',


}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolist()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.postTodolist("sick#myduck")
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "40f75b12-7060-476e-bf6a-caee5540b3b7"
        todolistApi.deleteTodolist(todolistId)
            .then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "8af5e235-9e53-47b2-a287-6e649368803c"
const title = "hello@#@#@#@#@#heello"
todolistApi.putTodolist(todolistId,title )
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "ba452692-0eb4-49c9-8651-3479d0c8df1c"
        todolistApi.getTasks(todolistId )
            .then(res => setState(res.data.items))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const PutTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "ba452692-0eb4-49c9-8651-3479d0c8df1c"
        const taskId = "30311b63-39bb-425d-ae34-5720f40cf2a0"
        const title= "dididididididididididididi"
        todolistApi.putTasks(todolistId,taskId,
        { title: title,
            description: null,
            completed: false,
            status: 3,
            priority: 3,
            startDate: null,
            deadline: null}
        )
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const taskId  = "8aba45df-375d-401a-8bdc-09452465723d"
        const todolistId = "ba452692-0eb4-49c9-8651-3479d0c8df1c"
        todolistApi.deleteTask(todolistId,taskId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const PostTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "ba452692-0eb4-49c9-8651-3479d0c8df1c"
       const title = "KQKQKQKQKQ11111KQKQKQKQKQ"
        todolistApi.postTask(todolistId,title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

