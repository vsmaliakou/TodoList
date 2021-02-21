import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItem()
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <TextField variant={"outlined"}
                       value={title}
                       onChange={changeTitle}
                       onKeyPress={onKeyPressAddTask}
                       onBlur={() => {setError(false)}}
                       helperText={error ? "Title is required" : ""}
                       label={"Title"}
                       error={error}/>
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;