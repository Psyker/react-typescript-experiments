import * as React from 'react';
import {FunctionComponent} from "react";
import styled from "styled-components";
import TodoList from "./components/TodoList";

const App: FunctionComponent = (props) => {
    return (
        <div {...props}>
            <TodoList/>
        </div>
    );
};

export default styled(App)``