"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { URL } from "../constants";

const DEV_BACKEND_URL = URL;

export async function getContactsForUser(id: number) {
  const contacts = await axios.get(`${DEV_BACKEND_URL}/api/v1/contact/${id}`);

  return contacts.data;
}

export async function createContact(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const birthDate = formData.get("birthDate") as string;
  const user_id = formData.get("user_id") as string;

  const contact = await axios.post(`${DEV_BACKEND_URL}/api/v1/contact`, {
    name,
    role,
    email,
    phone,
    birthDate,
    user_id: parseInt(user_id),
  });

  console.log(contact.data);

  revalidatePath("/main/contacts");

  redirect("/main/contacts");
}

export async function deleteContact(id: number) {
  await axios.delete(`${DEV_BACKEND_URL}/api/v1/contact/${id}`);

  revalidatePath("/main/contacts");

  redirect("/main/contacts");
}
