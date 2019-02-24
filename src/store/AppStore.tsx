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

    @action public addTodo = (todoItem: Pick<Todo, 'name'>) => {
        this.todos.push({
            ...todoItem,
            id: this.todos.length + 1,
            done: false,
            createdAt: new Date(),
            updatedAt: new Date()
        })
    };

    @action public changeTodo = (todoItem: Todo) => {
        this.todos = this.todos.map(todo => {
            if (todo.id === todoItem.id) {
                todo = todoItem
            }

            return todo
        })
    };

    @action public deleteTodo = (todoItem: Todo) => {
        this.todos.remove(todoItem)
    };

    get doneTodos() {
        return this.todos.filter(todo => todo.done).length
    }
}

const appStore = new AppStore();
export default appStore
