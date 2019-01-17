import * as React from 'react'
import {FunctionComponent, MouseEventHandler, useRef} from "react";
import styled from "styled-components";
import appStore from "../store/AppStore";
import {observer} from "mobx-react-lite";
import TodoItem from "./TodoItem";

const TodoList: FunctionComponent = (props) => {

    const {todos, addTodo, doneTodos} = appStore;
    const input = useRef<HTMLInputElement>(null);

    const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
        if (input.current) {
            addTodo({
                id: todos.length + 1,
                name: input.current.value,
                done: false,
                createdAt: new Date(),
            });
            input.current.value = ''
        }
    };

    return (
        <div {...props}>
            {todos.map((todo, index) => <TodoItem key={index} todo={todo} />)}
            <input ref={input} type="text"/>
            <div>Done: {doneTodos}</div>
            <button onClick={onClickHandler}>Add</button>
        </div>
    );
};

export default styled(observer(TodoList))`

`