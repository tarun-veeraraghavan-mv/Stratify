"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createCourse(formData: FormData) {
  const token = cookies().get("token")?.value;

  const semesterNumber = formData.get("semesterNumber") as string;
  const name = formData.get("name") as string;
  const proffessorName = formData.get("proffessorName") as string;
  const description = formData.get("description") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const progress = formData.get("progress") as string;
  const grade = formData.get("grade") as string;
  const difficulty = formData.get("difficulty") as string;
  const semesterColor = formData.get("semesterColor") as string;

  console.log("Token:", token);

  console.log({
    semesterNumber: Number(semesterNumber),
    name,
    proffessorName,
    description,
    startDate,
    endDate,
    startTime,
    endTime,
    progress,
    grade: Number(grade),
    difficulty,
    semesterColor,
  });

  const res = await axios.post(
    `http://${process.env.BACKEND_URL}/courses/`,
    {
      semesterNumber: Number(semesterNumber),
      name,
      proffessorName,
      description,
      startDate,
      endDate,
      startTime,
      endTime,
      progress,
      grade: Number(grade),
      difficulty,
      semesterColor,
    },
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);
  //
  revalidatePath("/main/courses");

  redirect("/main/courses");
}

export async function getCoursesForUser() {
  const token = cookies().get("token")?.value;

  const res = await axios.get(
    `http://${process.env.BACKEND_URL}/courses/byUserId`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);

  return res.data;
}

export async function getCourseById(courseId: number) {
  const token = cookies().get("token")?.value;

  console.log(token);

  const course = await axios.get(
    `http://${process.env.BACKEND_URL}/courses/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(course.data);
  revalidatePath("/main/courses");

  return course.data;
}

export async function deleteCourse(courseId: number) {
  const token = cookies().get("token")?.value;

  await axios.delete(`http://${process.env.BACKEND_URL}/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidatePath("/main/courses");
}

export async function markCourseCompleted(courseId: number) {
  const token = cookies().get("token")?.value;

  await axios.patch(
    `http://${process.env.BACKEND_URL}/courses/markCompleted/${courseId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidatePath("/main/courses");

  redirect("/main/achievements");
}

export async function markCourseUncompleted(id: number) {
  const token = cookies().get("token")?.value;

  await axios.patch(
    `http://${process.env.BACKEND_URL}/courses/markUncompleted/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidatePath("/main/courses");
  revalidatePath("/main/courses");

  redirect("/main/courses");
}
