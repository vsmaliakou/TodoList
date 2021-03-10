import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeStatusAC, changeTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"

function AppWithReducer() {
    //BLL:
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, dispatchTodoLists] = useReducer(todolistReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
        ],
    })

    //function for tasks
    function removeTask(taskID: string, todolistID: string) {
        let action = removeTaskAC(taskID, todolistID)
        dispatchToTasks(action)
    }
    function addTask(taskTitle: string, todolistID: string) {
        dispatchToTasks(addTaskAC(taskTitle, todolistID))
    }
    function changeStatus(taskID: string, todolistID: string, isDone: boolean) {
        dispatchToTasks(changeStatusAC(taskID, todolistID, isDone))
    }
    function changeTaskTitle(taskID: string, todolistID: string, title: string) {
        dispatchToTasks(changeTitleAC(taskID, todolistID, title))
    }

    //function for Todolist
    function changeFilter(newFilterValue: FilterValuesType, todolistID: string) {
        dispatchTodoLists(ChangeTodolistFilterAC(newFilterValue, todolistID))
    }
    function removeTodolist(todolistId: string) {
        let action = RemoveTodolistAC(todolistId)
        dispatchTodoLists(action)
        dispatchToTasks(action)
    }
    function addTodolist(title: string) {
        let action = AddTodolistAC(title)
        dispatchTodoLists(action)
        dispatchToTasks(action)
    }
    function changeTodolistTitle(title: string, todolistID: string) {
        dispatchTodoLists(ChangeTodolistTitleAC(title, todolistID))
    }

    const listTodo = todoLists.map(tl => {
        let taskForTodolist = tasks[tl.id]
        if (tl.filter === "active") {
            taskForTodolist = tasks[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            taskForTodolist = tasks[tl.id].filter(t => t.isDone === true)
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={10} style={{padding: "20px"}}>
                    <Todolist
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForTodolist}
                    filter={tl.filter}
                    addTask={addTask}
                    removeTask={removeTask}
                    removeTodolist={removeTodolist}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}
                />
                </Paper>
            </Grid>
        )
    })

    // User Interface:
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
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {listTodo}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;