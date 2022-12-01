import React, {useCallback, useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {AppRootStateType, useAppDispatch, useAppSelector} from './store'
import {InitializedAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {CircularProgress} from "@mui/material";
import {LogOutTC} from "../features/Login/login-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";


function App() {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const initialized = useSelector<AppRootStateType, boolean>((state) => state.app.initialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isLoggedIn)

    useEffect(()=>{dispatch(InitializedAppTC(initialized))},[])

    if (!initialized){
        return <div className={"forUnloginLoader"}><CircularProgress/></div>
    }
const onButtonClickHandler = ()=>{
dispatch(LogOutTC())
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
                    {isLoggedIn && <Button onClick={onButtonClickHandler} color="inherit">Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                   <Route path = "/" element={<TodolistsList/>} />
                   <Route path = "/login" element={<Login/>} />
                   <Route path = "/404" element={<h1>NOT FOUND</h1>} />
                   <Route path = "*" element={<Navigate to="/404/"/>} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
