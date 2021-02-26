import {v1} from "uuid";
import {TaskStateType} from "../App";
import {AddTaskAC, ChangeStatusAC, ChangeTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";

test('correct task should be added', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let taskTitle = "New task";

    const startState: TaskStateType = {
        [todolistID1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
        ],
    }

    const endState = tasksReducer(startState, AddTaskAC(taskTitle, todolistID1))

    expect(endState[todolistID1].length).toBe(5);
    expect(endState[todolistID1][4].title).toBe(taskTitle);
    expect(endState === startState).toBeFalsy()
});

test('correct task should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TaskStateType = {
        [todolistID1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
        ],
    }

    const endState = tasksReducer(startState, RemoveTaskAC(startState[todolistID1][0].id, todolistID1))

    expect(endState[todolistID1].length).toBe(3);
    expect(endState[todolistID1][0].title).toBe("CSS");
});

test('correct status of task should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TaskStateType = {
        [todolistID1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
        ],
    }

    const endState = tasksReducer(startState, ChangeStatusAC(startState[todolistID1][0].id, todolistID1, !startState[todolistID1][0].isDone))

    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID1][0].title).toBe("JS");
    expect(endState[todolistID1][0].isDone).toBe(false);
});

test('correct title of task should be changed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const newTitle = "JS for kids"

    const startState: TaskStateType = {
        [todolistID1]: [
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Redux", isDone: true},
        ],
        [todolistID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Meat", isDone: true},
        ],
    }

    const endState = tasksReducer(startState, ChangeTitleAC(startState[todolistID1][0].id, todolistID1, newTitle))

    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID1][0].title).toBe(newTitle);
});