import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //BLL:
    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
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

    function removeTask(taskID: string, todolistID: string) {
        const todolistTasks = tasks[todolistID]
        tasks[todolistID] = todolistTasks.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function changeFilter(newFilterValue: FilterValuesType, todolistID: string) {
        const todolist = todoLists.find(t => t.id === todolistID)
        if (todolist) {
            todolist.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function addTask(taskTitle: string, todolistID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        const todolistTasks = tasks[todolistID]
        tasks[todolistID] = [...todolistTasks, newTask]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, isDone: boolean, todolistID: string) {
        const todolistTasks = tasks[todolistID]
        const task: TaskType | undefined = todolistTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
        const todolistTasks = tasks[todolistID]
        const task: TaskType | undefined = todolistTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function removeTodolist(todolistId: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    function addTodolist(title: string) {
        const newTodolistID = v1()
        const newTodolist: TodolistType = {
            id: newTodolistID,
            title: title,
            filter: "all"
        }
        setTodoLists([newTodolist, ...todoLists])
        setTasks({...tasks, [newTodolistID]: []})
    }

    function changeTodolistTitle(title: string, todolistID: string) {
        const todolist = todoLists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.title = title
            setTodoLists([...todoLists])
        }
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

export default App;