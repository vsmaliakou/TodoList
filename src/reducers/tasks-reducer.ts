import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    todolistID: string
}
type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todolistID: string
}
type ChangeStatusActionType = {
    type: "CHANGE-STATUS"
    taskID: string
    todolistID: string
    isDone: boolean
}
type ChangeTitleActionType = {
    type: "CHANGE-TITLE"
    taskID: string
    todolistID: string
    title: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType |
    ChangeStatusActionType | ChangeTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType

let initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const copyState = {...state}
            const todolistTasks = copyState[action.todolistID]
            copyState[action.todolistID] = todolistTasks.filter(t => t.id !== action.taskID)
            return copyState
        }
        case "ADD-TASK": {
            const copyState = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const todolistTasks = copyState[action.todolistID]
            copyState[action.todolistID] = [...todolistTasks, newTask]
            return copyState
        }
        case "CHANGE-STATUS": {
            let stateCopy = {...state}
            let todolistTasks = stateCopy[action.todolistID]
            let task = todolistTasks.find(t => t.id === action.taskID)
            if(task) {
                task.isDone = action.isDone
            }
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, isDone: action.isDone}
                    } else {
                        return task
                    }
                })
            }
        }
        case "CHANGE-TITLE": {
            let stateCopy = {...state}
            let todolistTasks = stateCopy[action.todolistID]
            let task = todolistTasks.find(t => t.id === action.taskID)
            if(task) {
                task.title = action.title
            }
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => {
                    if (task.id === action.taskID) {
                        return {...task, title: action.title}
                    } else {
                        return task
                    }
                })
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistID]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
                delete stateCopy[action.id]
                return stateCopy
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskID, todolistID}
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistID}
}
export const changeStatusAC = (taskID: string, todolistID: string, isDone: boolean): ChangeStatusActionType => {
    return {type: "CHANGE-STATUS", taskID, todolistID, isDone}
}
export const changeTitleAC = (taskID: string, todolistID: string, title: string): ChangeTitleActionType => {
    return {type: "CHANGE-TITLE", taskID, todolistID, title}
}

