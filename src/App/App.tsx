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
import {Login} from "../features/TodolistsList/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";


export type FilterValuesType = 'all' | 'active' | 'completed';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

/// 37 min 16 app for stud by Dimich
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
                <Routes>
                  <Route path={"/"} element={ <TodolistList todolists={todolists}/>}/>
                  <Route path ={'login'} element={<Login/>} />
                  <Route path ={"*"} element={<Navigate to={"/404"}/>} />
                  <Route path ={'/404'} element={<h1>PAGE NOT FOUND</h1>} />

                </Routes>
                <CustomizedSnackbars/>
            </Container>
        </div>
    );
}
export default App;
// куки текстовый формат данных.
// Исполюзуюся для логинивания.
// в котором есть имя значеиня и другие.
// экспаер - уничтожение куки.
// размер у куки ограничен.
// поэтому куки маленькие.
// хранятся в браузере
// входим кука создается. выходим куки отвечающие за вход удаляются.
// Между браезерами и доменами не шарится
