import React from "react";

export default function SubmitButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="font-bold text-xl bg-blue-400 hover:bg-blue-500 transition-all duration-100 w-full p-2 rounded-lg text-white cursor-pointer"
    >
      {text}
    </button>
  );
}
