import * as React from 'react'
import {ChangeEventHandler, FunctionComponent, useRef} from "react";
import styled from "styled-components";
import appStore, {Todo} from "../store/AppStore";
import {observer} from "mobx-react-lite";

interface Props {
    readonly todo: Todo
}

const TodoItem: FunctionComponent<Props> = (props) => {
    const {todo} = props;
    const {changeTodo} = appStore;
    const input = useRef<HTMLInputElement>(null);

    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = event => {
        changeTodo({...todo, done: event.target.checked})
    };

    return (
        <div {...props}>
            <input ref={input} onChange={onChangeHandler} type="checkbox"/> {todo.name}
        </div>
    );
};

export default styled(observer(TodoItem))`

`