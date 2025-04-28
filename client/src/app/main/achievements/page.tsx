import Container from "@/components/ui/Container";
import { getCoursesForUser } from "@/lib/actions/course";
import { getAllCompletedTodosForUser } from "@/lib/actions/todo";
import { CoursePayload, TodoPayload } from "@/lib/types/model";
import { Chip } from "@heroui/react";
import AccordianComp from "./AccordianComp";

export default async function page() {
  const courses: CoursePayload = await getCoursesForUser();
  const todos: TodoPayload = await getAllCompletedTodosForUser();

  return (
    <Container>
      <div>
        <p className="text-2xl font-bold border-b-2 border-gray-300 pb-1">
          Completed Courses
        </p>

        <AccordianComp courses={courses} />
      </div>
      <div>
        <p className="text-2xl font-bold border-b-2 border-gray-300 pb-1">
          Completed Todos
        </p>
        <ul className="grid grid-cols-3 gap-3 py-2">
          {todos.todo.map((t) => (
            <li key={t.id}>
              <div key={t.id} className="bg-gray-100 p-2 rounded-lg">
                <div className="flex gap-2">
                  <Chip
                    color={
                      t.progress === "Not started"
                        ? "danger"
                        : t.progress === "Completed"
                        ? "success"
                        : "warning"
                    }
                  >
                    {t.progress}
                  </Chip>
                  <Chip
                    color={
                      t.priority === "Low"
                        ? "success"
                        : t.priority === "Medium"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {t.priority}
                  </Chip>
                </div>
                <p>Name: {t.name}</p>
                <p>Due date: {t.dueDate}</p>
                <p>Remarks: {t.remarks}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
