import React, {useCallback, useEffect} from 'react'
import './App.css';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {AddItemForm} from '../Components/AddItemForm/AddItemForm';
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
    fetchTodolistsTC,
    removeTodolistTC,
    TodolistDomainType
} from '../features/TodolistsList/Todolist/todolists-reducer';
import {AddTaskTC, ChangeTaskStatusTitleTC, removeTaskTC} from '../features/TodolistsList/Todolist/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {LinearProgress} from "@mui/material";
import {TodolistList} from "../features/TodolistsList/TodolistsList";


export type FilterValuesType = 'all' | 'active' | 'completed';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

/// зафетчил сейчас свойсвто андэфайнэд
function App() {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

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
            <LinearProgress/>
            <Container fixed>
            <TodolistList todolists={todolists}/>
            </Container>
        </div>
    );
}
export default App;
