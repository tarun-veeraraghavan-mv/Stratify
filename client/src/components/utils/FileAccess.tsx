import { FileUpload } from "@prisma/client";
import React from "react";

interface FileAccessProps {
  files: FileUpload[];
}

export default function FileAccess({ files }: FileAccessProps) {
  console.log(files);
  const courseId = 12;
  return (
    <div>
      {files
        ?.filter((file) => file.courseId === courseId)
        ?.map((file) => (
          <div key={file.id} className="flex justify-between">
            <a
              href={`https://ajneyuqnepdytnzampyq.supabase.co/storage/v1/object/public/courses//${file.fileUrl}`}
              target="_blank"
              download
            >
              {file.name}: <span className="underline">View course file</span>
            </a>

            {/* <button
              className="text-red-500 text-md"
              onClick={() => deleteFile(file.id)}
            >
              Delete
            </button> */}
          </div>
        ))}
    </div>
  );
}

// https://ajneyuqnepdytnzampyq.supabase.co/storage/v1/object/public/courses//1741572796367-db.sqlite

// WHAT WE GOT: https://emgpuifemogjyllulvyp.supabase.co/storage/v1/object/public/courses//1741573485583-db.sqlite

// WHAT WE WANT: https://ajneyuqnepdytnzampyq.supabase.co/storage/v1/object/public/courses//1741573485583-db.sqlite
