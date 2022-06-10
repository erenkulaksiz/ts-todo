import { TodoProps } from "interfaces/todo.interface";
import storage from "utils/localstorage";

function addTodo({title, createdAt, completed}: TodoProps){
    const CurrTodos = storage.get("todos");
    CurrTodos.push({title, createdAt, completed});
    storage.set("todos", CurrTodos);
}

export default addTodo;