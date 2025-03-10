"use client";

import { deleteTodo, markTodoCompleted } from "@/lib/actions/todos.action";
import { Todo } from "@/lib/types/todo.types";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="bg-gray-100 rounded-md p-2 items-start">
      <div className="flex gap-2 align-middle">
        <p className="p-1 rounded-lg bg-green-300">{todo.progress}</p>
        <p className="p-1 rounded-lg bg-green-300">{todo.priority}</p>
      </div>
      <p>📕 Todo name: {todo.name}</p>
      <p>✍🏻 Remarks: {todo.remarks}</p>
      <p>⏰ Due date: {todo.dueDate}</p>
      <div className="flex gap-2">
        <button
          className="py-1 px-2 bg-emerald-500 text-white rounded-lg cursor-pointer"
          onClick={() => markTodoCompleted(todo.id)}
        >
          Mark Completed
        </button>
        <button
          className="py-1 px-2 bg-red-500 text-white rounded-lg cursor-pointer"
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
