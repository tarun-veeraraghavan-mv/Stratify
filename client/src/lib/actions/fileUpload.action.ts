"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../db/supabase";
import { prisma } from "../prisma";

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const courseId = formData.get("courseId") as string;
  const userId = formData.get("userId") as string;

  const filePath = `${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("courses")
    .upload(filePath, file);

  if (error || !data?.path) {
    console.log(error || "File upload failed.");
    throw new Error("File upload failed.");
  }

  await prisma.fileUpload.create({
    data: {
      name: file.name,
      fileUrl: data.path,
      courseId: parseInt(courseId),
      userId: parseInt(userId),
    },
  });

  revalidatePath("/main/contacts");
}

export async function viewFiles(userId: number) {
  const files = await prisma.fileUpload.findMany({
    where: {
      userId,
    },
  });

  return files;
}

export async function deleteFile(id: number) {
  await prisma.fileUpload.delete({
    where: { id },
  });

  revalidatePath("/main/contacts");
}
