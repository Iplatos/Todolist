import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {logoutTC, meTC} from "../features/login/authReducer";


function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const initialized = useAppSelector<boolean>((state) => state.app.initialized)
    const isLoggedin = useAppSelector<boolean>((state) => state.login.isLoggedIn)
const dispatch = useAppDispatch()

    useEffect(()=>{
         dispatch(meTC())
    },[])

    const buttonClichHandler = () => {
        dispatch(logoutTC())
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedin && <Button onClick={buttonClichHandler} color="inherit">Login</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodolistsList/>}/>
                    <Route path = "/login" element={<Login/>}/>
                    <Route path = "*" element={<Navigate to={"/404/"}/>}/>
                    <Route path = "/404/" element={<h1 style={{textAlign:"center"}}>PAGE NOT FOUND</h1>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
