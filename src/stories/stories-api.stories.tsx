import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true, //при каждом запросе забирает куку. axois это бибилтотека делать реквесты из браузера XTMLHHPRequest
    headers: {"API-KEY": "8cf4078c-1ea5-4807-a2b5-794fda862abd"}
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {


        todolistAPI.getTodolist()
            .then((res) => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "NEwTodoJustAdded"
        todolistAPI.createTodolist(title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "d62a5e84-ca73-4916-a49d-38705611aec1"
        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = "60247d89-e9fe-44ed-bb27-96f9ee8d1493"
    const title = "TodolistWithTasksNUmberTWOTWOTWOTWOTWOTWOTT"
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, title)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = "7925f4dd-cc57-44d1-a9f6-eb08d347473e"
        todolistAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const title = "titleForTasks"
    const todolistID = "7925f4dd-cc57-44d1-a9f6-eb08d347473e"
    useEffect(() => {
        todolistAPI.createTask(todolistID, title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const Updatetask = () => {
    const [state, setState] = useState<any>(null)
    const taskId = "50541d36-a7d3-4eaa-b77d-0865acd025b8"
    const todolistID = "d3ee5e85-4ce9-4e37-b4e8-ad363d73beed"
    const title = "TitleWasChanged"

    useEffect(() => {
        todolistAPI.updateTask(todolistID, taskId, title)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)

    const todolistID = "d3ee5e85-4ce9-4e37-b4e8-ad363d73beed"
    const taskId = "50541d36-a7d3-4eaa-b77d-0865acd025b8"
    useEffect(() => {
        todolistAPI.deletetask(todolistID, taskId)
            .then(res => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

