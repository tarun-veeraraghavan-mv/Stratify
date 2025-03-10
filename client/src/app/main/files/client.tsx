"use client";

import FileAccess from "@/components/utils/FileAccess";
import FileUpload from "@/components/utils/FileUpload";
import { FileUpload as FileUploadType } from "@prisma/client";
import { useState } from "react";

export default function Client({
  files,
  userId,
}: {
  files: FileUploadType[];
  userId: string;
}) {
  const [input, setInput] = useState("");

  const filteredFiles =
    input.length > 0
      ? files.filter((file) =>
          file.name.toLowerCase().includes(input.toLowerCase())
        )
      : files;

  return (
    <div>
      <div className="mb-2 flex flex-col gap-2 sm:flex sm:flex-row justify-between align-middle">
        <p className="text-xl font-bold hidden lg:block">
          All of your resources
        </p>
        <input
          type="text"
          placeholder="Search your files"
          className="py-1 px-2 bg-gray-300 w-[300px] rounded-lg focus:outline-none focus:ring-0 text-gray-900 md:focus:w-[320px] transition-all duration-200"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <FileUpload courseId="12" userId={userId} />
      </div>

      <hr />

      <div className="mt-3">
        <FileAccess files={filteredFiles} />
      </div>
    </div>
  );
}
