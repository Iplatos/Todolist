import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddTodoPropsType = {
    callBack: ( title: string ) => void

}

const AddItemForm: React.FC<AddTodoPropsType> = (props) => {
    const {callBack} = props

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
          let newTitle = title.trim()
            callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddItemForm;