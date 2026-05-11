import { useState } from 'react';

/* Parent Component */
export default function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  /* ADD TODO */
  function addTodo() {
    if (input.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    // Immutable update
    setTodos([...todos, newTodo]);

    setInput('');
  }

  /* DELETE TODO */
  function deleteTodo(id) {
    // Immutable update
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);
  }

  /* TOGGLE COMPLETE */
  function toggleTodo(id) {
    // Immutable update
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    setTodos(updatedTodos);
  }

  return (
    <div>
      <h2>Todo App</h2>

      <TodoInput
        input={input}
        setInput={setInput}
        addTodo={addTodo}
      />

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
      />
    </div>
  );
}

/* Input Component */
function TodoInput({ input, setInput, addTodo }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Enter todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addTodo}>Add</button>
    </div>
  );
}

/* List Component */
function TodoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </ul>
  );
}

/* Single Todo Component */
function TodoItem({ todo, deleteTodo, toggleTodo }) {
  return (
    <li>
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          textDecoration: todo.completed
            ? 'line-through'
            : 'none',
          cursor: 'pointer',
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    </li>
  );
}