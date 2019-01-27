import * as React from 'react'
import {FunctionComponent, MouseEventHandler} from "react";
import styled from "styled-components";
import appStore from "../store/AppStore";
import {observer} from "mobx-react-lite";
import TodoItem from "./TodoItem";
import {useInput, useKeyboardShortcuts} from "../utils/hooks";

const TodoList: FunctionComponent = (props) => {
    const {todos, addTodo, doneTodos} = appStore;
    const {setValue, ...todoInput} = useInput('');
    const userAddTodo: MouseEventHandler<HTMLButtonElement> = () => {
        if (todoInput.value != '') {
            addTodo({name: todoInput.value,});
            setValue('')
        }
    };

    useKeyboardShortcuts([{
        action: userAddTodo,
        keys: ['ENTER']
    }], [todoInput]);

    return (
        <div {...props}>
            {todos.map((todo, index) => <TodoItem key={index} todo={todo} />)}
            <input {...todoInput} type="text"/>
            <div>Done: {doneTodos}</div>
            <button onClick={userAddTodo}>Add</button>
        </div>
    );
};

export default styled(observer(TodoList))``
