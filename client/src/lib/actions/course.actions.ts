"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { URL } from "../constants";

// const PROD_BACKEND_URL = process.env.BACKEND_URL as string;
const DEV_BACKEND_URL = URL;

export async function createCourse(formData: FormData) {
  const semesterNumber = formData.get("semesterNumber") as string;
  const name = formData.get("name") as string;
  const proffessorName = formData.get("proffessorName") as string;
  const desc = formData.get("desc") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const progress = formData.get("progress") as string;
  const grade = formData.get("grade") as string;
  const difficulty = formData.get("difficulty") as string;
  const semesterColor = formData.get("semesterColor") as string;
  const user_id = formData.get("user_id") as string;

  await axios.post(`${DEV_BACKEND_URL}/api/v1/course`, {
    semesterNumber: parseInt(semesterNumber),
    name,
    proffessorName,
    desc,
    startDate,
    endDate,
    startTime,
    endTime,
    progress,
    grade: parseInt(grade),
    difficulty,
    semesterColor,
    user_id: parseInt(user_id),
  });

  revalidatePath("/main/courses");
  revalidatePath("/main/todos");

  redirect("/main/courses");
}

export async function getCoursesForUser(id: number) {
  const courses = await axios.get(
    `${DEV_BACKEND_URL}/api/v1/users/${id}/course`
  );

  return courses.data;
}

export async function deleteCourse(id: number) {
  try {
    await axios.delete(`${DEV_BACKEND_URL}/api/v1/course/${id}`);

    revalidatePath("/main/courses");
  } catch (error) {
    console.log(error);
  }
}
