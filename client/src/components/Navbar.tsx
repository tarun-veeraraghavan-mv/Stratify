import { getCurrentUser, getCurrentUserId } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React from "react";
import defualtUserImg from "../../public/default_user.png";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
  const id = (await getCurrentUserId()) as string;

  if (!id) {
    redirect("/signup");
  }

  const user = await getCurrentUser(parseInt(id));

  return (
    <div className="sticky top-0 border-b-2 border-gray-300 bg-white">
      <ul className="flex justify-between py-4 px-5 ">
        <li className="text-lg font-bold  self-center">
          <Link href="/main/dashboard">Dashboard</Link>
        </li>
        <li className="text-lg font-bold self-center">
          <Link href="/main/courses">Courses</Link>
        </li>
        <li className="text-lg font-bold self-center">
          <Link href="/main/todos">Todos</Link>
        </li>
        <li className="text-lg font-bold self-center">
          <Link href="/main/contacts">Contacts</Link>
        </li>
        <li className="text-lg font-bold flex align-middle">
          <Image
            src={defualtUserImg}
            alt="Defualt User Avatar"
            width={40}
            height={40}
          />
          <p className="self-center">{user.name}</p>
        </li>
      </ul>
    </div>
  );
}
