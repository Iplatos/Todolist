import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

    return <div>
        <h3> <EditableSpan value={props.title} onChange={changeTodolistTitle} />
           {/*<button >x</button>*/}
            <IconButton aria-label="delete">
                <Delete onClick={removeTodolist} />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                       {/* <button onClick={onClickHandler}>x</button>*/}
                        <IconButton size={"small"} aria-label="delete">
                            <Delete onClick={onClickHandler} />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>

        <Button /*className={props.filter === 'all' ? "active-filter" : ""}*/
                onClick={onAllClickHandler} size={"small"} variant={props.filter === 'all' ? "text" : "contained"}  color="primary"> All </Button>
           {/* <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>
            </button>*/}
            <Button /*className={props.filter === 'all' ? "active-filter" : ""}*/
                    onClick={onActiveClickHandler} size={"small"} variant={props.filter === 'active' ? "text" : "contained"} color='primary'> Active </Button>

           {/* <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>*/}

            <Button /*className={props.filter === 'all' ? "active-filter" : ""}*/
                onClick={onCompletedClickHandler} size={"small"} variant={props.filter === 'completed' ? "text" : "contained"}  color='primary' > Completed </Button>

            {/*<button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>*/}
        </div>
    </div>
}


