import { uploadFile } from "@/lib/actions/fileUpload.action";
import { useState, useTransition } from "react";

export default function FileUpload({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) {
  console.log("Client userId:", userId);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, startTransition] = useTransition();

  async function handleUpload() {
    if (!file) return console.log("Please select a file");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", courseId);
    formData.append("userId", userId);

    startTransition(async () => {
      await uploadFile(formData);
    });
  }

  return (
    <div className="flex gap-2 align-middle">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-[250px] self-center px-2 py-1 bg-gray-100"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-2 py-1 bg-blue-400 text-white rounded-lg font-bold"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
