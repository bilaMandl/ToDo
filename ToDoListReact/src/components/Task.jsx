import React, { useEffect, useState } from 'react';
import Service from '../Service.js';

function Task() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  async function getTodos() {
      try {
          const todos = await Service.getTasks();
          if (todos) { 
              setTodos(todos);
          } else {
              console.log('No todos received');
          }
      } catch (error) {
          console.error('Error fetching todos:', error);
      }
  }

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
// import React, { useEffect, useState } from 'react';
// import Service from '../Service.js';

// function Task() {
//   const [newTodo, setNewTodo] = useState("");
//   const [todos, setTodos] = useState([]);

//   async function getTodos() {
//     try {
//       const todos = await Service.getTasks();
//       if (todos) {
//         setTodos(todos);
//       } else {
//         console.log('No todos received');
//       }
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//     }
//   }

//   async function createTodo(e) {
//     e.preventDefault();
//     if (newTodo.trim() === "") return;
//     try {
//       await Service.addTask(newTodo);
//       setNewTodo("");
//       await getTodos();
//     } catch (error) {
//       console.error('Error adding todo:', error);
//     }
//   }

//   async function updateCompleted(todo, isComplete) {
//     try {
//       await Service.setCompleted(todo.id, isComplete);
//       await getTodos();
//     } catch (error) {
//       console.error('Error updating todo:', error);
//     }
//   }

//   async function deleteTodo(id) {
//     try {
//       await Service.deleteTask(id);
//       await getTodos();
//     } catch (error) {
//       console.error('Error deleting todo:', error);
//     }
//   }

//   useEffect(() => {
//     getTodos();
//   }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-full max-w-lg p-5 bg-white shadow-lg rounded-lg">
//         <header className="w-full mb-4">
//           <h1 className="text-2xl font-bold text-center">Todos</h1>
//           <form onSubmit={createTodo} className="flex mt-4">
//             <input
//               className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none"
//               placeholder="Well, let's take on the day"
//               value={newTodo}
//               onChange={(e) => setNewTodo(e.target.value)}
//             />
//             <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
//               Add
//             </button>
//           </form>
//         </header>
//         <section className="w-full">
//           <ul className="space-y-2">
//             {todos.map((todo) => (
//               <li
//                 key={todo.id}
//                 className={`flex items-center justify-between p-3 border rounded-md shadow-sm ${todo.isComplete ? 'bg-gray-100 line-through' : 'bg-white'}`}
//               >
//                 <div className="flex items-center">
//                   <input
//                     type="checkbox"
//                     checked={todo.isComplete}
//                     onChange={(e) => updateCompleted(todo, e.target.checked)}
//                     className="mr-3 cursor-pointer"
//                   />
//                   <span>{todo.name}</span>
//                 </div>
//                 <button
//                   onClick={() => deleteTodo(todo.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   ✖
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Task;
