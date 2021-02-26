import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
}
type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-FILTER",
    filter: FilterValuesType,
    id: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TITLE",
    title: string,
    id: string
}
export type ActionType = AddTodolistActionType | RemoveTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType

export const todolistReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodolistID = v1()
            const newTodolist: TodolistType = {
                id: newTodolistID,
                title: action.title,
                filter: "all"
            }
            return [newTodolist, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "CHANGE-FILTER": {
            // const todolist = state.find(t => t.id === action.id)
            // if (todolist) {
            //     todolist.filter = action.filter
            //     return [...state]
            // }
            // return state
            return state.map(tl => {
                if(tl.id === action.id){
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        case "CHANGE-TITLE": {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
                return [...state]
            }
            return state
        }
        default:
            return state
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return { type: "ADD-TODOLIST", title: newTodolistTitle}
}
export const ChangeTodolistFilterAC = (newFilter: FilterValuesType, todolistId2: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-FILTER', filter: newFilter, id: todolistId2};
}
export const ChangeTodolistTitleAC = (newTodolistTitle: string, todolistId2: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TITLE', title: newTodolistTitle, id: todolistId2};
}
