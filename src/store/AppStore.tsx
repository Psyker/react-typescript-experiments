import {List} from "../utils/extensions";
import {action, observable} from "mobx";

export interface Todo {
    id: number,
    name: string,
    done: boolean,
    createdAt: Date,
    updatedAt?: Date
}

class AppStore {
    @observable public todos: List<Todo> = new List();

    @action public addTodo = (todoItem: Todo) => {
        this.todos.push(todoItem)
    };

    @action public changeTodo = (todoItem: Todo) => {
        this.todos = this.todos.map(todo => {
            if (todo.id === todoItem.id) {
                todo = todoItem
            }

            return todo
        })
    };

    get doneTodos() {
        return this.todos.filter(todo => todo.done).length
    }
}

const appStore = new AppStore();
export default appStore