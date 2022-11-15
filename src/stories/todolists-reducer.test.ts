import {setTodolistsAC, TodolistDomainType, todolistsReducer} from "../state/todolists-reducer";
import {TodolistType} from "../api/todolists-api";

test("name", ()=> {

    const startState = [
    {id: "todolistID1", title:"asdasd" , addedDate: "ASd", order: 0, },
        {id: "todolistID2", title:"asdasd"  , addedDate: "ASd", order: 0, }
    ]


    const action = setTodolistsAC(startState)
const endState = todolistsReducer([], action)

expect(endState.length).toBe(2)
})