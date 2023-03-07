import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [textValue, setTextValue] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const changeHandler = (e) => {
    setTextValue(e.target.value);
  };

  const addTodoHandler = () => {
    setTodos([...todos, { id: Date.now(), todo: textValue, checked: false }]);
    setTextValue("");
  };

  const checkboxHandler = (editTodoId) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, checked: !todo.checked };
        } else {
          return todo;
        }
      })
    );
    setTextValue("");
    setIsEdit(false);
  };

  const editHandler = (editTodo) => {
    setTextValue(editTodo.todo);
    setIsEdit(true);
    setCurrentTodo({ ...editTodo });
  };

  const updateTodoHandler = () => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === currentTodo.id) {
          return { ...todo, todo: textValue };
        } else {
          return todo;
        }
      })
    );
    setIsEdit(false);
    setTextValue("");
  };

  const deleteHandler = (deleteTodoId) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== deleteTodoId;
      })
    );
  };

  useEffect(() => {
    const storeTodos = JSON.stringify(todos);
    localStorage.setItem("todos", storeTodos);
  }, [todos]);

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input type="text" value={textValue} onChange={changeHandler} />
      &nbsp; &nbsp;
      {isEdit ? (
        <button onClick={updateTodoHandler}>Update Todo </button>
      ) : (
        <button onClick={addTodoHandler}>Add Todo </button>
      )}
      <h3>My Todos</h3>
      {todos?.map((todo, i) => (
        <div key={todo.id} className="todos-container">
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => checkboxHandler(todo.id)}
          />
          &nbsp;
          <span
            style={{
              textDecoration: todo.checked ? "line-through" : "none",
              fontSize: "20px"
            }}
          >
            {todo.todo}
          </span>
          &nbsp; &nbsp;
          <button disabled={todo.checked} onClick={() => editHandler(todo)}>
            Edit
          </button>
          &nbsp; &nbsp;
          <button onClick={() => deleteHandler(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
