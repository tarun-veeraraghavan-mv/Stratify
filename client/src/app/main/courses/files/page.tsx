import Container from "@/components/ui/Container";

import React from "react";
import CourseFilesClientPage from "./CourseFilesClientPage";
import { getCourseFileForUser } from "@/lib/actions/course-files-upload";
import { CourseFile } from "@/lib/types/model";

export default async function page() {
  const files: CourseFile[] = await getCourseFileForUser();

  console.log(files);

  return (
    <Container>
      <CourseFilesClientPage files={files} />
    </Container>
  );
}
