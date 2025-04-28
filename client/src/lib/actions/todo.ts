"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAllTodos() {
  const token = cookies().get("token")?.value;

  console.log(token);

  const todos = await axios.get(`http://${process.env.BACKEND_URL}/todos/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(todos.data);

  return todos.data;
}

export async function getTodosForUser(courseId: number) {
  const token = cookies().get("token")?.value;

  const todos = await axios.get(
    `http://${process.env.BACKEND_URL}/todos/byCourseId/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(todos.data);

  return todos.data;
}

export async function createTodo(formData: FormData) {
  const token = cookies().get("token")?.value;

  const name = formData.get("name") as string;
  const dueDate = formData.get("dueDate") as string;
  const progress = formData.get("progress") as string;
  const priority = formData.get("priority") as string;
  const remarks = formData.get("remarks") as string;
  const courseId = formData.get("courseId") as string;

  console.log({
    name,
    dueDate,
    progress,
    priority,
    remarks,
  });

  const todo = await axios.post(
    `http://${process.env.BACKEND_URL}/todos/byCourseId/${Number(courseId)}`,
    {
      name,
      dueDate,
      progress,
      priority,
      remarks,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidatePath("/main/todos");

  console.log(todo.data);
}

export async function markTodoCompleted(todoId: number) {
  const token = cookies().get("token")?.value;

  await axios.patch(
    `http://${process.env.BACKEND_URL}/todos/markCompleted/${todoId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidatePath("/main/todos");
  revalidatePath("/main/achievements");

  redirect("/main/achievements");
}

export async function getAllCompletedTodosForUser() {
  const token = cookies().get("token")?.value;

  const res = await axios.get(
    `http://${process.env.BACKEND_URL}/todos/completed`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);

  return res.data;
}

export async function deleteTodo(todoId: number) {
  const token = cookies().get("token")?.value;

  await axios.delete(`http://${process.env.BACKEND_URL}/todos/${todoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidatePath("/main/todos");
}
