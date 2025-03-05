import React, { useEffect, useState } from 'react';
import Service from '../Service.js';

function Task() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
    try {
      const todos = await Service.getTasks();
      if (Array.isArray(todos)) {
        setTodos(todos);
        console.log(todos.toString);
      } else {
        console.log('No todos received or received non-array:', todos);
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }
  // async function getTodos() {
  //     try {
  //         const todos = await Service.getTasks();
  //         if (todos) { 
  //             setTodos(todos);
  //             console.log(todos)
  //         } else {
  //             console.log('No todos received');
  //         }
  //     } catch (error) {
  //         console.error('Error fetching todos:', error);
  //     }
  // }

  async function createTodo(e) {
    e.preventDefault();
    if (newTodo.trim() === "") return; // Prevent adding empty todos
    try {
      await Service.addTask(newTodo);

      setNewTodo(""); // Clear input
      await getTodos(); // Refresh tasks list
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  }

  async function updateCompleted(todo, isComplete) {
    try {
      await Service.setCompleted(todo.id, isComplete);
      await getTodos(); // Refresh tasks list
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  }

  async function deleteTodo(id) {
    try {
      await Service.deleteTask(id);
      await getTodos(); // Refresh tasks list
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoTask">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input
            className="new-todo"
            placeholder="Well, let's take on the day"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => (
            <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.isComplete}
                  onChange={(e) => updateCompleted(todo, e.target.checked)}
                />
                <label>{todo.name}</label>
                <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default Task;
