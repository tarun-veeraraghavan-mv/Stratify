"use server";

import axios from "axios";
import { redirect } from "next/navigation";

// const PROD_BACKEND_URL = process.env.BACKEND_URL as string;
const DEV_BACKEND_URL = process.env.DEV_BACKEND_URL as string;

export async function createProfile(formData: FormData) {
  console.log(Object.fromEntries(formData));
  const dateOfBirth = formData.get("dateOfBirth") as string;
  const gender = formData.get("gender") as string;
  const location = formData.get("location") as string;
  const currentCollege = formData.get("currentCollege") as string;
  const major = formData.get("major") as string;
  const minor = formData.get("minor") as string;
  const userId = formData.get("userId") as string;

  const profile = await axios.post(`${DEV_BACKEND_URL}/api/v1/profile`, {
    dateOfBirth,
    gender,
    location,
    currentCollege,
    major,
    minor,
    user_id: parseInt(userId),
  });

  console.log(profile);

  redirect("/");
}
