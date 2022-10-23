import {SetTodolistAC, todolistsReducer} from "./state/todolists-reducer";
import {TodolistType} from "./api/todolist-api";

test("todolist should be set to the state",()=>{
    const startState= [
        {id:"1", title:"hello",filter:"all" ,addedDate: "", order: 0},
        {id:"2", title:"hello2", filter:"all" ,addedDate: "", order: 0}
    ]

    const action = SetTodolistAC( [
        {id:"1", title:"hello",filter:"all" ,addedDate: "", order: 0},
        {id:"2", title:"hello2", filter:"all" ,addedDate: "", order: 0}
    ])
    const endState = todolistsReducer(([
        {id:"1", title:"hello",filter:"all" ,addedDate: "", order: 0},
        {id:"2", title:"hello2", filter:"all" ,addedDate: "", order: 0}
    ]),action)

expect(endState[0].filter).toBe("all")
expect(endState.length).toBe(2)
})