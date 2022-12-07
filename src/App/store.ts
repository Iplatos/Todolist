import {TasksActionType, tasksReducer} from '../features/TodolistsList/Todolist/tasks-reducer';
import {TodolistsActionType, todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppReducer, AppStatusType} from "./appReducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:AppReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer,applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния


export type AppDispatch = typeof store.dispatch
export type AppActionsType = TasksActionType | TodolistsActionType | AppStatusType
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppDispatch = () =>useDispatch<AppDispatch>()
export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
