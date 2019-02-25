import * as React from 'react'
import {FunctionComponent, MouseEventHandler, useState} from "react";
import styled from "styled-components";
import appStore from "../store/AppStore";
import {observer} from "mobx-react-lite";
import TodoItem from "./TodoItem";
import {useInput, useKeyboardShortcuts} from "../utils/hooks";
import {PoseGroup} from "react-pose";

const TodoList: FunctionComponent = (props) => {
    const {addTodo, doneTodos, filters ,filtered, changeFilters} = appStore;
    const {setValue, ...todoInput} = useInput('');
    const [search, setSearch] = useState('');
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
                {filtered.map((todo, index) => <TodoItem key={index} todo={todo} />)}
            </PoseGroup>
            <input {...todoInput} type="text"/>
            <div>Done: {doneTodos}</div>
            <button onClick={userAddTodo}>Add</button>
            <input type="checkbox" checked={filters.done} onChange={() => {
                changeFilters({...filters, done: !filters.done})
            }}/>
            <input type="text" value={search} onChange={(e) => {
                console.log(filters, search);
                setSearch(e.target.value);
                changeFilters({...filters, search: search})
            }}/>
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
