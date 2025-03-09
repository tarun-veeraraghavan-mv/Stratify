import { getCurrentUser, getCurrentUserId } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React from "react";

export default async function Navbar() {
  const id = (await getCurrentUserId()) as string;

  if (!id) {
    redirect("/signup");
  }

  const user = await getCurrentUser(parseInt(id));

  return (
    <div className="sticky top-0">
      <ul className="flex justify-between py-4 px-5 bg-blue-300">
        <li className="text-lg font-bold">Dashboard</li>
        <li className="text-lg font-bold">Courses</li>
        <li className="text-lg font-bold">Todos</li>
        <li className="text-lg font-bold">{user.name}</li>
      </ul>
    </div>
  );
}
