import Link from "next/link";
import React from "react";

interface ContactHeaderProps {
  input: string;
  setInput: (value: string) => void;
}

export default function ContactHeader({ input, setInput }: ContactHeaderProps) {
  return (
    <div className="mb-2 flex justify-between align-middle">
      <p className="text-xl font-bold hidden md:block">All of your contacts</p>
      <input
        type="text"
        placeholder="Search your contacts"
        className="py-1 px-2 bg-gray-300 w-[300px] rounded-lg focus:outline-none focus:ring-0 text-gray-900 md:focus:w-[370px] transition-all duration-200"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Link
        href="/main/contacts/add-contact"
        className="px-2 py-1 rounded-md border-none bg-emerald-500 text-white cursor-pointer"
      >
        + Add Contact
      </Link>
    </div>
  );
}
