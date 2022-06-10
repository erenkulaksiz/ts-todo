import { TodoProps } from "interfaces/todo.interface";
import storage from "utils/localstorage";

function deleteTodo(createdAt: number){
    const CurrTodos = storage.get("todos");
    const index = CurrTodos.findIndex((el: TodoProps) => el.createdAt == createdAt);
    CurrTodos.splice(index, 1);
    storage.set("todos", CurrTodos);
}

export default deleteTodo;