import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title:string
    callBack:(newTitle:string)=>void
}

const EditableSpan:React.FC<EditableSpanPropsType> = (props) => {
    let {title} = props
    let [newTitle, setNewTitle] = useState(title)
    const [edit,SetEdit] = useState(false)
    const onDoubleClickHandler = () => {
        SetEdit(!edit)

    }

    const addTask = (addTask:string) => {
        if (newTitle.trim() !== "") {
            props.callBack(newTitle);

        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
        addTask(newTitle)
    }
    return (
        edit
           ? <input onChange={onChangeHandler} onBlur={onDoubleClickHandler} value={newTitle} autoFocus></input>
           : <span onDoubleClick={onDoubleClickHandler}>{title}</span>

    );
};

export default EditableSpan;