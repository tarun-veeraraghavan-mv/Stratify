"use client";

import { useFormStatus } from "react-dom";
import React from "react";

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="font-bold text-xl bg-blue-400 hover:bg-blue-500 transition-all duration-100 w-full p-2 rounded-lg text-white cursor-pointer"
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
