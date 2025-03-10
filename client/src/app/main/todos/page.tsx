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
      <div className="mb-2">
        <h2 className="text-2xl font-bold">All of your todos</h2>
      </div>

      <hr />

      <ul className="sm:grid sm:grid-cols-2 gap-3 grid grid-cols-1 items-start mt-3">
        {courses.map((course) => (
          <li key={course.id} className="rounded-lg shadow-2xl overflow-hidden">
            <CourseItemHeader course={course} />

            <div className="p-1 flex items-start justify-between">
              <div className="flex gap-2">
                <p className="text-lg font-bold self-center">
                  {todos.filter(
                    (todo) =>
                      todo.course_id === course.id && todo.completed === false
                  ).length > 0
                    ? `❌ ${
                        todos.filter(
                          (todo) =>
                            todo.course_id === course.id &&
                            todo.completed === false
                        ).length
                      } todo left`
                    : "No todos left"}{" "}
                  |
                </p>
                <p className="text-lg font-bold self-center">
                  {todos.filter((todo) => todo.completed === true).length > 0
                    ? `👍 ${
                        todos.filter((todo) => todo.completed === true).length
                      } todo completed`
                    : "No todos left"}
                </p>
              </div>

              <Link
                href={`/main/todos/add-todo/${course.id}`}
                className="rounded-lg p-2 bg-emerald-500 text-white"
              >
                + Add todo
              </Link>
            </div>

            {todos.some(
              (todo) => todo.course_id === course.id && !todo.completed
            ) && (
              <ul className="p-2 lg:grid lg:grid-cols-2 lg:gap-3 flex flex-col gap-2">
                {todos
                  .filter(
                    (todo) => todo.course_id === course.id && !todo.completed
                  )
                  .slice(0, 4)
                  .map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}


//  VzKjjQP2ItirHIwb