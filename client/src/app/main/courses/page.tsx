import Container from "@/components/ui/Container";
import CoursePageClient from "./CoursePageClient";
import { getCoursesForUser } from "@/lib/actions/course";
import { CoursePayload } from "@/lib/types/model";

export default async function page() {
  const courses: CoursePayload = await getCoursesForUser();

  return (
    <Container>
      <CoursePageClient courses={courses} />
    </Container>
  );
}
