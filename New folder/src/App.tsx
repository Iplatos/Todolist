import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== id)})
        /*   let filteredTasks = tasks.filter(t => t.id != id);
           setTasks(filteredTasks);*/
    }

    function addTask(todolistID: string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [task, ...tasks[todolistID]]})
        /*   let newTasks = [task, ...tasks];
           setTasks(newTasks);*/
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        /*     let task = tasks[todolistID].find(t => t.id === taskId);
              if (task) {
                  task.isDone = isDone;
              */

        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        });
    }


    /*   let tasksForTodolist = tasks;

       if (todolists[0].filter === "active") {
           tasksForTodolist = tasks.filter(t => !t.isDone);
       }
       if (todolists[0].filter === "completed") {
           tasksForTodolist = tasks.filter(t => t.isDone);
       }*/

    function changeFilter(todolistID: string, value: FilterValuesType) {

        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))

        //setFilter(value);
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }
    const AddTodolist = ( NewTitle: string) => {

        let NewTodolistId = v1()
        let NewTodolist:TodolistsType = {id: NewTodolistId, title: NewTitle, filter: 'all'}
        setTodolists([NewTodolist, ...todolists])
        setTasks({...tasks,[NewTodolistId]:[]})
    }
    const EditTask = (todolistID: string , taskID: string, NewTitle: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el=>el.id ===taskID ? {...el,title:NewTitle} : el)})
    }


    return (
        <div className="App">
            <AddItemForm callBack={AddTodolist}/>
            {todolists.map((todolist) => {
                let tasksForTodolist = tasks[todolist.id];

                if (todolist.filter === "active") {
                    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
                }
                if (todolist.filter === "completed") {
                    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
                }

                return (
                    <Todolist key={todolist.id}
                              todolistID={todolist.id}
                              title={todolist.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={todolist.filter}
                              removeTodolist={removeTodolist}
                              callBack={EditTask}


                    />
                )
            })}

        </div>
    );
}

export default App;
