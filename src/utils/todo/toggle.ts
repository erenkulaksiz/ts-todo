import { TodoProps } from "interfaces/todo.interface";
import storage from "utils/localstorage";

function toggleTodo(createdAt: number){
    const CurrTodos = storage.get("todos");
    const index = CurrTodos.findIndex((el: TodoProps) => el.createdAt == createdAt);
    CurrTodos[index].completed = !CurrTodos[index].completed;
    storage.set("todos", CurrTodos);
}

export default toggleTodo;