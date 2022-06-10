import Head from "next/head";
import { useEffect, useState } from "react";

import { TodoProps } from "interfaces/todo.interface";

import { Layout, Container, Todo } from "components";
import storage from "utils/localstorage";
import { addTodo, deleteTodo, toggleTodo } from "utils/todo";

function Home() {
  const [todoInput, setTodoInput] = useState<string>("");
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setTodos(storage.get("todos"));
  }, []);

  const filters: { [key in string]: () => void } = {
    all() {
      setTodos(storage.get("todos"));
    },
    notcompleted() {
      const allTodos = storage.get("todos");
      const newTodos = allTodos.filter((todo: TodoProps) =>
        todo.completed == true ? 0 : -1
      );
      setTodos(newTodos);
    },
    completed() {
      const allTodos = storage.get("todos");
      const newTodos = allTodos.filter((todo: TodoProps) =>
        todo.completed == false ? 0 : -1
      );
      setTodos(newTodos);
    },
  };

  useEffect(() => {
    console.log("filter", filter);
    filters[filter]();
  }, [filter]);

  function newTodo() {
    if (todoInput.length == 0) return;
    addTodo({
      title: todoInput,
      completed: false,
      createdAt: Date.now(),
    });
    const newTodos = [
      ...todos,
      {
        title: todoInput,
        completed: false,
        createdAt: Date.now(),
      },
    ];
    setTodos(newTodos);
    setTodoInput("");
    filters[filter]();
  }

  function removeTodo(createdAt: number) {
    deleteTodo(createdAt);
    const newTodos = [...todos];
    const index = todos.findIndex((el: TodoProps) => el.createdAt == createdAt);
    newTodos.splice(index, 1);
    setTodos(newTodos);
    filters[filter]();
  }

  function toggle(createdAt: number) {
    toggleTodo(createdAt);
    const CurrTodos = [...todos];
    const index = todos.findIndex((el: TodoProps) => el.createdAt == createdAt);
    CurrTodos[index].completed = !CurrTodos[index].completed;
    setTodos(CurrTodos);
    filters[filter]();
  }

  function changeFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.target.value);
  }

  return (
    <Layout>
      <Head>
        <title>TypeScript Todo App</title>
        <meta name="description" content="my first typescript project." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div>
          <div className="flex flex-col gap-2 py-2 sticky top-0 backdrop-blur-sm bg-white/80">
            <h1 className="text-3xl">TO-DO App</h1>
            <div className="flex flex-row">
              <input
                type="text"
                value={todoInput}
                placeholder="type todo name..."
                className="shadow flex border-2 py-1 flex-1 px-2 rounded-lg"
                onChange={(e) => setTodoInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") newTodo();
                }}
              />
              <button
                onClick={newTodo}
                className="flex shadow px-3 ml-1 border-2 items-center rounded-lg hover:opacity-70 active:scale-95"
              >
                +
              </button>
            </div>
            <div className="flex flex-col">
              <div>
                <input
                  type="radio"
                  id="all"
                  name="filter"
                  value="all"
                  defaultChecked
                  checked={filter == "all"}
                  onChange={changeFilter}
                />
                <label htmlFor="all" className="ml-1">
                  All
                </label>

                <input
                  type="radio"
                  className="ml-2"
                  name="filter"
                  value="notcompleted"
                  id="notcompleted"
                  checked={filter == "notcompleted"}
                  onChange={changeFilter}
                />
                <label htmlFor="notcompleted" className="ml-1">
                  Not Completed
                </label>

                <input
                  type="radio"
                  name="filter"
                  value="completed"
                  id="completed"
                  className="ml-2"
                  checked={filter == "completed"}
                  onChange={changeFilter}
                />
                <label htmlFor="completed" className="ml-1">
                  Completed
                </label>
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-col pb-2">
            {todos.map(function (todo, index) {
              return (
                <Todo
                  key={index}
                  todo={todo}
                  onDeleteTodo={() => removeTodo(todo.createdAt)}
                  onToggleTodo={() => toggle(todo.createdAt)}
                />
              );
            })}
            {todos.length == 0 && filter == "all" ? (
              <div className="flex items-center justify-center">
                add todo to get started...
              </div>
            ) : (
              todos.length == 0 &&
              filter != "all" && (
                <div className="flex items-center justify-center">
                  cant find any todos
                </div>
              )
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default Home;
