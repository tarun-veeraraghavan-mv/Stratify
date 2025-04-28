import Container from "@/components/ui/Container";
import TodoClientPage from "./TodoClientPage";
import { getCoursesForUser } from "@/lib/actions/course";
import { getAllTodos } from "@/lib/actions/todo";

export default async function page() {
  const courses = await getCoursesForUser();
  const todos = await getAllTodos();

  return (
    <Container>
      <TodoClientPage courses={courses} todos={todos} />
    </Container>
  );
}
