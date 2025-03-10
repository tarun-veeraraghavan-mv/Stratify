import { viewFiles } from "@/lib/actions/fileUpload.action";
import Container from "@/ui/Container";
import React from "react";
import Client from "./client";
import { getCurrentUserId } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";

export default async function Page() {
  const id = await getCurrentUserId();

  if (!id) {
    redirect("/");
  }

  const files = await viewFiles(parseInt(id));

  return (
    <Container>
      <Client files={files} userId={id} />
    </Container>
  );
}
