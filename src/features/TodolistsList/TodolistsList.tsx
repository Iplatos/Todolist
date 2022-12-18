import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from "./Todolist/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import React, {useCallback, useEffect} from "react";
import {AddTaskTC, ChangeTaskStatusTitleTC, removeTaskTC} from "./Todolist/tasks-reducer";
import {TaskStatuses, TodolistType} from "../../api/todolist-api";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {FilterValuesType, TasksStateType} from "../../App/App";
import {Navigate} from "react-router-dom";

type TodolistListPropType = {
    todolists: TodolistDomainType[]
}
export const TodolistList = (props: TodolistListPropType) => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLogedIn)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoggedIn){
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])


    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId));
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = AddTaskTC(todolistId, title);
        dispatch(action);
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = ChangeTaskStatusTitleTC(todolistId, id, {status});
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {

        const action = ChangeTaskStatusTitleTC(todolistId, id, {title: newTitle});
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC({id:todolistId, filter:value});
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

    if (!isLoggedIn){
        return <Navigate to={"login"}/>
    }

    return (<>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist} entityStatus={"idle"}/>
        </Grid>
        <Grid container spacing={3}>

        </Grid>
        {
            props.todolists.map(tl => {
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
                            entityStatus={tl.entityStatus}
                        />
                    </Paper>
                </Grid>
            })
        }
    </>)
}
