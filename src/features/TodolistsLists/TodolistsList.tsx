import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../App/store";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    FilterValuesType, removeTodolistTC,
    setTodolistsTC,
    TodolistDomainType
} from "./todolist/todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, removeTaskTC, UpdateTaskTC} from "./todolist/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";
import {TasksStateType} from "../../App/App";

type TodolistsListPropsType = {
}

export const TodolistsLists = (props: TodolistsListPropsType) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(setTodolistsTC)
    },[])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const action = removeTaskTC(id, todolistId);
        dispatch(action);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTaskTC(title, todolistId);
        dispatch(action);
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = UpdateTaskTC(id, todolistId, {status});
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = UpdateTaskTC(id, todolistId, {title:newTitle});
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistTC(id);
        dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = changeTodolistTitleTC(id, title);
        dispatch(action);
    }, []);

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistTC(title);
        dispatch(action);
    }, [dispatch]);

    return (<>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>)
}