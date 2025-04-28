"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function uploadCourseFile(formData: FormData) {
  const token = cookies().get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await axios.post(`http://127.0.0.1:8081/course-files`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);

  revalidatePath("/main/courses/files");
}

export async function getCourseFileForUser() {
  const token = cookies().get("token")?.value;

  const res = await axios.get(`http://127.0.0.1:8081/course-files/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function deleteFile(id: number) {
  const token = cookies().get("token")?.value;

  await axios.delete(`http://127.0.0.1:8081/course-files/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidatePath("/main/course/files");
}
