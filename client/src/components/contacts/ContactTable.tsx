import { Contact } from "@/lib/types/contact.types";
import React from "react";

interface ContactTableProps {
  contacts: Contact[];
}

export default function ContactTable({ contacts }: ContactTableProps) {
  return (
    <div>
      <ul className="grid grid-cols-[100px_200px_200px_200px_200px_200px] max-w-[1100px] overflow-x-auto mt-3">
        <li className="p-2 bg-red-300 rounded-tl-lg">Number</li>
        <li className="p-2 bg-blue-300">Name</li>
        <li className="p-2 bg-rose-300">Role</li>
        <li className="p-2 bg-green-300">Email</li>
        <li className="p-2 bg-amber-300">Phone</li>
        <li className="p-2 bg-indigo-300 rounded-tr-lg">DOB</li>

        {contacts.map((contact) => (
          <React.Fragment key={contact.id}>
            <li className="p-2 ">{contact.id}</li>
            <li className="p-2 ">{contact.name}</li>
            <li className="p-2 ">{contact.role}</li>
            <li className="p-2 ">{contact.email}</li>
            <li className="p-2 ">{contact.phone}</li>
            <li className="p-2  ">{contact.birthDate}</li>
          </React.Fragment>
        ))}
      </ul>
      {!contacts.length && (
        <p className="text-center text-lg mt-5 font-bold">No results found!</p>
      )}
    </div>
  );
}
