import {TasksActionType, tasksReducer} from '../features/TodolistsList/Todolist/tasks-reducer';
import { todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer';
import {combineReducers} from 'redux';
import thunk, {ThunkAction} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppReducer,} from "./appReducer";
import {loginReducer} from "../features/TodolistsList/Login/LoginReducer";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: AppReducer,
    login: loginReducer
})
// непосредственно создаём store
//export const store = createStore(rootReducer,applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),

})

export type AppDispatch = typeof store.dispatch
export type AppActionsType = TasksActionType
export type AppRootStateType = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
