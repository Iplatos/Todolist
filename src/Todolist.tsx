import React from "react";

type TodolistPropsType = {
    title: string
    tasks: Array <TasksPropsType>
}
type TasksPropsType = {
    id: number
    title: string
    isDone: boolean

}


export function Todolist(props: TodolistPropsType) {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((tasks,index)=>{
                        return <li key={index}><input type={"checkbox"} checked={tasks.isDone}/>
                                <span>{tasks.title}</span>
                                </li>

                    })
                }

            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}