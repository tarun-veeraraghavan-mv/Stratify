"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Decoded } from "../types/auth.types";

const JWT_SECRET = "qwsqwehweruwehrweiourhwer";
const JWT_EXPIRES_IN = "90d";

const PROD_BACKEND_URL = process.env.BACKEND_URL as string;

export async function signup(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await axios.post(`${PROD_BACKEND_URL}/api/v1/users`, {
    name,
    email,
    password,
  });

  const token = jwt.sign({ id: user.data.user.id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
  });

  console.log(user.data);

  redirect("/profile");
}

export async function getCurrentUserId() {
  const token = (await cookies()).get("token")?.value;

  console.log(token);

  if (!token) return null;

  console.log(jwt.decode(token));

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Decoded;

    console.log(decoded.id);
    return decoded.id;
  } catch (error) {
    console.error("Invalid or expired token", error);
    return null;
  }
}

export async function getCurrentUser(id: number) {
  const user = await axios.get(`${PROD_BACKEND_URL}/api/v1/users/${id}`);

  console.log(user.data);

  return user.data;
}
