import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from '../features/TodolistsLists/todolist/Todolist';
import {AddItemForm} from '../components/addItemForm/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Menu} from '@mui/icons-material';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    FilterValuesType,
    removeTodolistTC,
    setTodolistsTC,
    TodolistDomainType
} from '../features/TodolistsLists/todolist/todolists-reducer'
import {addTaskTC, removeTaskTC, UpdateTaskTC} from '../features/TodolistsLists/todolist/tasks-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store';
import {TaskStatuses, TaskType} from '../api/todolists-api'
import {TodolistsLists} from "../features/TodolistsLists/TodolistsList";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <TodolistsLists/>

            </Container>
        </div>
    );
}




export default App;
