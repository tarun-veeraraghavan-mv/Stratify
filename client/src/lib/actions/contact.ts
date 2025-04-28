"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createContact(formData: FormData) {
  const token = cookies().get("token")?.value;

  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const birthDate = formData.get("birthDate") as string;

  const res = await axios.post(
    `http://${process.env.BACKEND_URL}/contacts/`,
    {
      name,
      role,
      email,
      phone,
      birthDate,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidatePath("/main/contacts");

  return res.data;
}

export async function getContacts() {
  const token = cookies().get("token")?.value;

  const res = await axios.get(
    `http://${process.env.BACKEND_URL}/contacts/byUserId`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(res.data);

  revalidatePath("/main/contacts");

  return res.data;
}

export async function deleteContacts(id: number) {
  const token = cookies().get("token")?.value;

  const res = await axios.delete(
    `http://${process.env.BACKEND_URL}/contacts/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidatePath("/main/contacts");

  console.log(res.data);
}
