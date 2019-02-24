import * as React from 'react'
import {ChangeEventHandler, FunctionComponent,  useState} from "react";
import styled from "styled-components";
import appStore, {Todo} from "../store/AppStore";
import {observer} from "mobx-react-lite";
import {useInput} from "../utils/hooks";

interface Props {
    readonly todo: Todo
}

const TodoItem: FunctionComponent<Props> = (props) => {
    const {todo} = props;
    const {changeTodo, deleteTodo} = appStore;
    const {setValue, ...todoInput}= useInput(todo.name);
    const [isEditing, setIsEditing] = useState(false);

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
        changeTodo({...todo, done: event.target.checked})
    };

    const onDoubleClickHandler: React.MouseEventHandler<HTMLInputElement> = () => {
        setIsEditing(true)
    };

    const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = () => {
        setIsEditing(false);
        if (todoInput.value != '') {
            changeTodo({...todo, name: todoInput.value, updatedAt: new Date()});
            setValue('')
        }
    };

    const onDeleteHandler = () => {
        deleteTodo(todo)
    };

    return (
        <div {...props}>
            <input onChange={onChangeHandler} type="checkbox"/>
            {
                isEditing
                ? <input {...todoInput} onBlur={onBlurHandler}/>
                : <>
                    <button onClick={onDeleteHandler}>x</button>
                    <span onDoubleClick={onDoubleClickHandler}>{todo.name}</span>
                </>
            }
        </div>
    );
};

export default styled(observer(TodoItem))``
