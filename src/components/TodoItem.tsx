import * as React from 'react'
import {ChangeEventHandler, FunctionComponent,  useState} from "react";
import styled from "styled-components";
import appStore, {Todo} from "../store/AppStore";
import {observer} from "mobx-react-lite";
import {useInput} from "../utils/hooks";
import posed from "react-pose";

interface Props {
    readonly todo: Todo
}

const TodoPose = posed.div({
    enter: {
        opacity: 1,
        scale: 1
    },
    exit: {
        opacity: 0,
        scale: 0.5
    },
});

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
        <TodoPose {...props}>
            <input onChange={onChangeHandler} type="checkbox"/>
            {
                isEditing
                ? <input {...todoInput} onBlur={onBlurHandler}/>
                : <>
                    <span onClick={onDeleteHandler}>🗑</span>
                    <span onDoubleClick={onDoubleClickHandler}>{todo.name}</span>
                </>
            }
        </TodoPose>
    );
};

export default styled(observer(TodoItem))``
