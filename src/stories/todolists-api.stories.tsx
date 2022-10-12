import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "8cf4078c-1ea5-4807-a2b5-794fda862abd"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = (title: string) => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolists("myTO")
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "59d12275-c522-43e7-b48e-6eaf4671c09d"
        todolistsApi.deleteTodolists(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
            const todolistId = "59d12275-c522-43e7-b48e-6eaf4671c09d"
            todolistsApi.updateTodolistTitle(todolistId, "titFle")
                .then((res) => {

                    setState(res.data)
                })
        },
        [])

    return <div>
    {
        JSON.stringify(state)
    }
</div>
}


export const GetTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(()=>{
        const todolistId = "1a9d4e1e-0b1b-427d-857b-c2ce25b53356"
        todolistsApi.getTasks(todolistId)
            .then((res)=>{
                setState(res.data)
            })
    }, [])
return <div>{JSON.stringify(state)}</div>
}
