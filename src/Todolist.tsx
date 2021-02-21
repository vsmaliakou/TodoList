import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from './EditableSpan';
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (taskTitle: string, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    removeTodolist: (todolistId: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todolistID: string) => void
    changeStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

function Todolist(props: TodolistPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const all = () => {
        props.changeFilter("all", props.id)
    }
    const active = () => {
        props.changeFilter("active", props.id)
    }
    const completed = () => {
        props.changeFilter("completed", props.id)
    }
    const tasks = props.tasks.map(t => {

        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <Checkbox color={"primary"}
                          checked={t.isDone}
                          onChange={changeStatus}/>
                <EditableSpan title={t.title}
                              changeItem={changeTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id)

    return (
        <div>
            <h3><EditableSpan title={props.title} changeItem={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{listStyle: "none", paddingLeft: "0"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    size={"small"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={all}>All
                </Button>
                <Button
                    size={"small"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={active}>Active
                </Button>
                <Button
                    size={"small"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={completed}>Completed
                </Button>
            </div>
        </div>
    )
}

export default Todolist;