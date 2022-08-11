import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todolistID: string
    removeTodolist: (todolistID: string) => void
    callBack:(todolistID: string, taskId: string, NewTitle: string)=>void
}

export function Todolist(props: PropsType) {

    /*    let [title, setTitle] = useState("")
        let [error, setError] = useState<string | null>(null)*/

    /*   const addTask = () => {
           if (title.trim() !== "") {
               props.addTask(props.todolistID, title.trim());
               setTitle("");
           } else {
               setError("Title is required");
           }
       }*/

    /*   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
           setTitle(e.currentTarget.value)
       }
   */
    /*   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
           setError(null);
           if (e.key === "Enter") {
               addTask();
           }
       }*/



    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }
const AddTaskHandler = (newTitle:string) => {
    props.addTask(props.todolistID, newTitle)
}
    const editTaskHandler = (taskID:string, title: string) => {
        props.callBack(props.todolistID, taskID, title )
    }
    return <div>
        <h3>{props.title}
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <AddItemForm callBack={AddTaskHandler}/>
        {/*<div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                 /*   const editTaskHandler = (title: string) => {
                    props.callBack(props.todolistID, t.id, title )
                    }*/


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                       {/* <span>{t.title}</span>*/}
                        <EditableSpan  title={t.title} callBack={(title)=>editTaskHandler(t.id, t.title)}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
