import CourseHeader from "@/components/courses/CourseHeader";
import CourseItem from "@/components/courses/CourseItem";
import { getCurrentUserId } from "@/lib/actions/auth.action";
import { getCoursesForUser } from "@/lib/actions/course.actions";
import { Course } from "@/lib/types/course.types";
import Container from "@/ui/Container";
import { redirect } from "next/navigation";

export default async function Page() {
  const id = (await getCurrentUserId()) as string;

  if (!id) {
    redirect("/signup");
  }

  const courses: Course[] = await getCoursesForUser(parseInt(id));
  console.log("COURSES", courses);

  return (
    <Container>
      <CourseHeader />

      <hr />

      <ul className="grid grid-cols-3 gap-3 mt-4">
        {courses.map((course) => (
          <CourseItem course={course} key={course.id} />
        ))}
      </ul>
    </Container>
  );
}
