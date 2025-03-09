"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DEV_BACKEND_URL = process.env.DEV_BACKEND_URL as string;

export async function getTodosForUser(id: number) {
  const todos = await axios.get(`${DEV_BACKEND_URL}/api/v1/users/${id}/todo`);

  console.log(todos);

  return todos.data;
}

export async function deleteTodo(id: number) {
  await axios.delete(`${DEV_BACKEND_URL}/api/v1/todo/${id}`);

  revalidatePath("/main/todos");
}

export async function markTodoCompleted(id: number) {
  await axios.patch(`${DEV_BACKEND_URL}/api/v1/todo/${id}`);

  revalidatePath("/main/todos");
}

export async function createTodo(formData: FormData) {
  const name = formData.get("name") as string;
  const dueDate = formData.get("dueDate") as string;
  const progress = formData.get("progress") as string;
  const priority = formData.get("priority") as string;
  const remarks = formData.get("remarks") as string;
  const completed = formData.get("completed") as string;
  const course_id = formData.get("course_id") as string;
  const user_id = formData.get("user_id") as string;

  const todo = await axios.post(`${DEV_BACKEND_URL}/api/v1/todo`, {
    name,
    dueDate,
    priority,
    progress,
    remarks,
    completed,
    course_id: parseInt(course_id),
    user_id: parseInt(user_id),
  });

  console.log(todo.data);

  revalidatePath("/main/todos");

  redirect("/main/todos");
}
