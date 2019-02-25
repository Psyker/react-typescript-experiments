import * as React from 'react'
import {FunctionComponent, MouseEventHandler} from "react";
import styled from "styled-components";
import appStore from "../store/AppStore";
import {observer} from "mobx-react-lite";
import TodoItem from "./TodoItem";
import {useInput, useKeyboardShortcuts} from "../utils/hooks";
import {PoseGroup} from "react-pose";

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
            <PoseGroup>
                {todos.map((todo, index) => <TodoItem key={index} todo={todo} />)}
            </PoseGroup>
            <input {...todoInput} type="text"/>
            <div>Done: {doneTodos}</div>
            <button onClick={userAddTodo}>Add</button>
        </div>
    );
};

export default styled(observer(TodoList))`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
