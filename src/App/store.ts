import { tasksReducer } from '../features/TodolistsLists/todolist/tasks-reducer';
import { todolistsReducer } from '../features/TodolistsLists/todolist/todolists-reducer';
import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type ThunkAppDipatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<ThunkAppDipatchType>()

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
