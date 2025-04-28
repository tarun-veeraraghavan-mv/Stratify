"use client";

import PageHeader from "@/components/ui/PageHeader";
import { createContact, deleteContacts } from "@/lib/actions/contact";
import { ContactPayload } from "@/lib/types/model";
import {
  Button,
  Form,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { useState } from "react";

export default function ContactPageClient({
  contacts,
}: {
  contacts: ContactPayload;
}) {
  const [input, setInput] = useState("");

  const filteredContacts =
    input !== ""
      ? contacts?.contacts?.filter((c) => c?.name?.includes(input))
      : contacts?.contacts;

  return (
    <div>
      <PageHeader resource="contacts" input={input} setInput={setInput}>
        <Popover placement="left">
          <PopoverTrigger>
            <Button color="success">Add contacts</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-1">
              <Form action={createContact}>
                <div className="grid grid-cols-2 gap-3 mb-2">
                  <Input
                    isRequired
                    errorMessage="Please enter a name"
                    label="Couse name"
                    labelPlacement="outside"
                    name="name"
                    placeholder="Math 101"
                    type="text"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter role"
                    label="Role"
                    labelPlacement="outside"
                    name="role"
                    placeholder="Proffessor"
                    type="text"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter email"
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Proffessor"
                    type="text"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter phone"
                    label="Phone"
                    labelPlacement="outside"
                    name="phone"
                    placeholder="Proffessor"
                    type="text"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter date"
                    label="Birth date"
                    labelPlacement="outside"
                    name="birthDate"
                    type="date"
                  />
                </div>
                <div>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </PopoverContent>
        </Popover>
      </PageHeader>
      <div>
        <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>S. NO</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn>ROLE</TableColumn>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>PHONE</TableColumn>
            <TableColumn>BIRTH DATE</TableColumn>
            <TableColumn>{""}</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((c, i) => (
              <TableRow key={c.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{c.name}</TableCell>
                <TableCell>{c.role}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <TableCell>{c.birthDate}</TableCell>
                <TableCell>
                  <button
                    color="danger"
                    className="px-3 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => deleteContacts(c.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
