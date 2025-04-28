"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signin(email: string, password: string) {
  const res = await axios.post(
    `http://${process.env.BACKEND_URL}/auth/register`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );

  (await cookies()).set("token", res.data.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
  });

  redirect("/main/courses");
}

export async function test() {
  const res = await axios.get("http://127.0.0.1:8081/courses/byUserId", {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMSIsInIiOlsiVVNFUiJdLCJlIjoid2Vpcmh3ZXJ3ZSIsImV4cCI6MTc0NTcyMDkxNX0.c5iZwehr2knQZ_JlfH-HhmU-XJAS8XdfOqklE6D0_Gk`,
    },
  });

  console.log(res);

  return res;
}
