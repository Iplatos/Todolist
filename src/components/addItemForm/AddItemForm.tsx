import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { AddBox } from '@mui/icons-material';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType} from "../../app/app-reducer";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    console.log('AddItemForm called')
    const entityStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
                   disabled = {entityStatus === "loading"}
        />
        <IconButton disabled = {entityStatus === "loading"} color="primary" onClick={addItem}>
            <AddBox/>
        </IconButton>
    </div>
})
