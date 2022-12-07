import React from 'react'
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Menu} from '@mui/icons-material';
import {TodolistDomainType} from '../features/TodolistsList/Todolist/todolists-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {TaskType} from "../api/todolist-api";
import {LinearProgress} from "@mui/material";
import {TodolistList} from "../features/TodolistsList/TodolistsList";
import CustomizedSnackbars from "../Components/SnackBar/SnackBar";
import {RequestStatusType} from "./appReducer";


export type FilterValuesType = 'all' | 'active' | 'completed';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

/// STEP_#15 2021-08-05  1h50m
function App() {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
const appStatus = useSelector<AppRootStateType, RequestStatusType>(state=>state.app.status)

    console.log(appStatus)
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
            {appStatus === "loading" &&  <LinearProgress/>}
            <Container fixed>
            <TodolistList todolists={todolists}/>
                <CustomizedSnackbars/>
            </Container>
        </div>
    );
}
export default App;
