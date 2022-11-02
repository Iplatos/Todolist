
import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistAPI} from "../api/todolist-api";
import {instance} from "@storybook/node-logger";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
   header: {
        'API-KEY': "8cf4078c-1ea5-4807-a2b5-794fda862abd"
    }
}





export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
      todolistAPI.getTodolist()
          .then((res)=> {

              setState(res.data)}
          )
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
const title= "aaweeqweqweqweqweqew"
        todolistAPI.createTodolist(title)
            .then((res)=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "9f696420-54a4-4464-a7a5-2fa393e2017c"
        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "NEWTITLEFFFFFF"
        const todolistId = "4a63a5f2-c3ce-4922-a32a-3fb08b73872e"
        todolistAPI.updateTodolist(todolistId, title)
            .then(res=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "d3ee5e85-4ce9-4e37-b4e8-ad363d73beed"
        todolistAPI.getTasks(todolistId)
            .then(res=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "d3ee5e85-4ce9-4e37-b4e8-ad363d73beed"
        const title = "NewSUPERTASKS"
        todolistAPI.addTask(title,todolistId)
            .then(res=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = ()=>{
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "d3ee5e85-4ce9-4e37-b4e8-ad363d73beed"
        const title = "UPDATEDTASKNAME"
        const taskId = "b8312f1d-1a37-4ecc-b198-827d45e7e3eb"
        todolistAPI.updateTask(todolistId,taskId, title)
            .then(res=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = ()=>{
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "d3ee5e85-4ce9-4e37-b4e8-ad363d73beed"
        const taskId = "b8312f1d-1a37-4ecc-b198-827d45e7e3eb"
        todolistAPI.deleteTask(todolistId,taskId)
            .then(res=>setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

