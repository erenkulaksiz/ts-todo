import { DeleteIcon } from "icons";
import { TodoComponentProps } from "interfaces/todo.interface";

function Todo({ todo, onDeleteTodo, onToggleTodo }: TodoComponentProps) {
  return (
    <div className="w-full py-3 px-4 border-2 rounded-lg flex flex-row justify-between shadow-lg shadow-neutral-200/30">
      <div className="flex flex-row w-full">
        <div className="flex items-center">
          <input
            type="checkbox"
            onChange={() => onToggleTodo()}
            checked={todo.completed}
          />
        </div>
        <div
          className={`w-full break-all px-2 flex items-center text-lg ${
            todo.completed ? "line-through" : ""
          }`}
        >
          {todo.title}
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onDeleteTodo()}
          className="p-2 active:scale-90 rounded-full hover:opacity-70"
        >
          <DeleteIcon width={14} height={14} />
        </button>
      </div>
    </div>
  );
}

export default Todo;
