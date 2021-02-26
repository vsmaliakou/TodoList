import {TaskStateType, TaskType} from "../App";
import {v1} from "uuid";

type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    id: string
}
type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
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
type ActionType = AddTaskActionType | RemoveTaskActionType | ChangeStatusActionType |  ChangeTitleActionType

export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const copyState = {...state}
            const todolistTasks = copyState[action.id]
            copyState[action.id] = [...todolistTasks, newTask]
            return copyState
        }
        case "REMOVE-TASK": {
            const copyState = {...state}
            const todolistTasks = copyState[action.todolistID]
            copyState[action.todolistID] = todolistTasks.filter(t => t.id !== action.taskID)
            return copyState
        }
        case "CHANGE-STATUS": {
            const copyState = {...state}
            const todolistTasks = copyState[action.todolistID]
            const task: TaskType | undefined = todolistTasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return copyState
        }
        case "CHANGE-TITLE": {
            const copyState = {...state}
            const todolistTasks = copyState[action.todolistID]
            const task: TaskType | undefined = todolistTasks.find(t => t.id === action.taskID)
            if (task) {
                task.title = action.title
            }
            return copyState
        }
        default:
            return state
    }
}

export const AddTaskAC = (title: string, id: string): AddTaskActionType => {
    return { type: "ADD-TASK", title: title, id: id}
}
export const RemoveTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", taskID: taskID, todolistID: todolistID}
}
export const ChangeStatusAC = (taskID: string, todolistID: string, isDone: boolean): ChangeStatusActionType => {
    return { type: "CHANGE-STATUS", taskID: taskID, todolistID: todolistID, isDone: isDone}
}
export const ChangeTitleAC = (taskID: string, todolistID: string, title: string): ChangeTitleActionType => {
    return { type: "CHANGE-TITLE", taskID: taskID, todolistID: todolistID, title: title}
}