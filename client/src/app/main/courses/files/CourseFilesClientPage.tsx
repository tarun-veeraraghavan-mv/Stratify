"use client";

import PageHeader from "@/components/ui/PageHeader";
import {
  deleteFile,
  uploadCourseFile,
} from "@/lib/actions/course-files-upload";
import { CourseFile } from "@/lib/types/model";
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
import Link from "next/link";
import React, { FormEvent, useState } from "react";

interface CourseFilesClientPageProps {
  files: CourseFile[];
}

export default function CourseFilesClientPage({
  files,
}: CourseFilesClientPageProps) {
  const [input, setInput] = useState("");

  const [name, setName] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "input",
      new Blob([JSON.stringify({ name })], { type: "application/json" })
    );

    try {
      const res = await uploadCourseFile(formData);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredFiles =
    input !== "" ? files.filter((f) => f.name.includes(input)) : files;

  return (
    <div>
      <PageHeader resource="course files" input={input} setInput={setInput}>
        <Popover>
          <PopoverTrigger>
            <Button color="success">Create new file</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Form onSubmit={handleSubmit}>
              <Input
                isRequired
                errorMessage="Please enter a name"
                label="Couse name"
                labelPlacement="outside"
                name="name"
                placeholder="Math 101"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                isRequired
                errorMessage="Please enter a name"
                labelPlacement="outside"
                name="file"
                type="file"
                onChange={handleFileChange}
              />
              <Button type="submit" color="primary">
                Submit
              </Button>
            </Form>
          </PopoverContent>
        </Popover>
      </PageHeader>
      <div>
        <Table>
          <TableHeader>
            <TableColumn>ID</TableColumn>
            <TableColumn>NAME</TableColumn>
            <TableColumn className="text-right">OPTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {filteredFiles.map((f, i) => (
              <TableRow key={f.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{f.name}</TableCell>
                <TableCell className="text-right">
                  <Popover placement="right">
                    <PopoverTrigger>
                      <Button>Options</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="flex flex-col gap-2">
                        <Button
                          as={Link}
                          color="success"
                          href={f.fileUrl}
                          target="_blank"
                        >
                          View file &rarr;
                        </Button>
                        <Button
                          onPress={() => {
                            deleteFile(f.id);
                          }}
                          color="danger"
                        >
                          Delete file
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
