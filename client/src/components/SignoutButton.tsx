"use client";

import { signOut } from "@/lib/actions/auth.action";

export default function SignoutButton() {
  return (
    <button
      className="py-0.5 px-2 bg-blue-400 text-white rounded-lg cursor-pointer"
      onClick={signOut}
    >
      Signout
    </button>
  );
}
