"use client";

import { signOut } from "@/lib/actions/auth.action";

export default function SignoutButton() {
  return (
    <button
      className=" px-2 bg-blue-400 text-white rounded-lg cursor-pointer h-[30px] self-center"
      onClick={signOut}
    >
      Signout
    </button>
  );
}
