"use client";

import { TodoItem } from "@/components/TodoItem";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Todo } from "../types/todo";

export default function Home() {
  return (
    <div className="border rounded-md max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold ">Hello CopilotKit 🪁</h1>
      <h2 className="text-base font-base mb-4">Todo List Example</h2>

      <TodoList />
    </div>
  );
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const addTodo = () => {
    if (input.trim() !== "") {
      // Check if input is not just whitespace
      const newTodo: Todo = {
        id: nanoid(),
        text: input.trim(), // Trim whitespace
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setInput(""); // Reset input field
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const assignPerson = (id: string, person: string | null) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, assignedTo: person ? person : undefined }
          : todo
      )
    );
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          className="border rounded-md p-2 flex-1 mr-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress} // Add this to handle the Enter key press
        />
        <button
          className="bg-blue-500 rounded-md p-2 text-white"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      {todos.length > 0 && (
        <div className="border rounded-lg">
          {todos.map((todo, index) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              assignPerson={assignPerson}
              hasBorder={index !== todos.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
