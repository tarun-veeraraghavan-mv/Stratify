"use client";

import { useState } from "react";
import { Contact } from "@/lib/types/contact.types";
import Container from "@/ui/Container";
import ContactHeader from "./ContactHeader";
import ContactTable from "./ContactTable";
import FileUpload from "../utils/FileUpload";
import FileAccess from "../utils/FileAccess";
import { FileUpload as FileUploadType } from "@prisma/client";

interface ContactClientCompProps {
  contacts: Contact[];
  files: FileUploadType[];
}

export default function ContactClientComp({
  contacts,
  files,
}: ContactClientCompProps) {
  const [input, setInput] = useState("");

  const filteredContacts =
    input.length > 0
      ? contacts.filter((contact) =>
          contact.name.toLowerCase().includes(input.toLowerCase())
        )
      : contacts;

  return (
    <div>
      <Container>
        <ContactHeader input={input} setInput={setInput} />

        <hr />

        <ContactTable contacts={filteredContacts} />
        <FileUpload courseId="12" />
        <FileAccess files={files} />

       
      </Container>
    </div>
  );
}
