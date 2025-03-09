import CourseItemHeader from "@/components/courses/CourseItemHeader";
import TodoItem from "@/components/todos/TodoItem";
import { getCurrentUserId } from "@/lib/actions/auth.action";
import { getCoursesForUser } from "@/lib/actions/course.actions";
import { getTodosForUser } from "@/lib/actions/todos.action";
import { Course } from "@/lib/types/course.types";
import { Todo } from "@/lib/types/todo.types";
import Container from "@/ui/Container";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const id = (await getCurrentUserId()) as string;

  if (!id) {
    redirect("/signup");
  }

  const [courses, todos]: [Course[], Todo[]] = await Promise.all([
    getCoursesForUser(parseInt(id)),
    getTodosForUser(parseInt(id)),
  ]);

  return (
    <Container>
      <ul className="grid grid-cols-2 gap-3">
        {courses.map((course) => (
          <li key={course.id} className="rounded-lg shadow-2xl overflow-hidden">
            <CourseItemHeader course={course} />

            <div className="p-1 flex align-middle justify-between">
              <p className="text-lg font-bold self-center">
                No todos completed
              </p>
              <Link
                href={`/main/todos/add-todo/${course.id}`}
                className="rounded-lg p-2 bg-emerald-500 text-white"
              >
                + Add todo
              </Link>
            </div>

            {todos
              .filter(
                (todo) =>
                  todo.course_id === course.id && todo.completed === false
              )
              .map((todo) => (
                <ul key={todo.id} className="p-2 ">
                  <TodoItem todo={todo} />
                </ul>
              ))}
          </li>
        ))}
      </ul>
    </Container>
  );
}
