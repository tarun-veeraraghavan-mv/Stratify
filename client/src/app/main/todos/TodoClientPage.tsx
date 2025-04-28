"use client";

import PageHeader from "@/components/ui/PageHeader";
import { createTodo, deleteTodo, markTodoCompleted } from "@/lib/actions/todo";
import { CoursePayload, TodoPayload } from "@/lib/types/model";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Form,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@heroui/react";
import { useState } from "react";

interface TodoClientPageProps {
  courses: CoursePayload;
  todos: TodoPayload;
}

export default function TodoClientPage({
  courses,
  todos,
}: TodoClientPageProps) {
  const [courseList] = useState(courses.course);
  const [todoList, setTodoList] = useState(todos.todo);

  async function handleDelete(id: number) {
    await deleteTodo(id);
    setTodoList((prev) => prev.filter((t) => t.id !== id));
  }

  async function handleMarkCompleted(id: number) {
    await markTodoCompleted(id);
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, progress: "Completed" } : todo
      )
    );
  }

  const [input, setInput] = useState("");
  const filteredCourse =
    input !== ""
      ? courseList
          .filter((c) => c.progress !== "Completed")
          .filter((c) => c.name.includes(input))
      : courseList.filter((c) => c.progress !== "Completed");

  const progress = [
    { key: "Not started", label: "Not started" },
    { key: "In Progress", label: "In Progress" },
  ];

  const priority = [
    { key: "Low", label: "Low" },
    { key: "Medium", label: "Medium" },
    { key: "High", label: "High" },
  ];

  return (
    <div>
      <PageHeader resource="todos" input={input} setInput={setInput}>
        {""}
      </PageHeader>

      <ul className="grid grid-cols-2 py-3 gap-3">
        {filteredCourse.length === 0 ? (
          <p>No courses yet! Add courses to make some todos</p>
        ) : (
          filteredCourse.map((c) => (
            <li key={c.id}>
              <Card key={c.id}>
                <CardHeader
                  className="flex gap-3 justify-between"
                  style={{ backgroundColor: c.semesterColor }}
                >
                  <div className="flex flex-col">
                    <p className="text-xl font-bold">{c.name}</p>
                    <p className="text-lg">
                      Semester number: {c.semesterNumber}
                    </p>
                  </div>

                  <Popover>
                    <PopoverTrigger>
                      <Button color="primary">Add todo</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Form className="p-2" action={createTodo}>
                        <div className="grid grid-cols-2 gap-3 mb-2">
                          <Input
                            isRequired
                            errorMessage="Please enter name"
                            label="Name"
                            labelPlacement="outside"
                            name="name"
                            type="text"
                            placeholder="Name of course"
                            min={0}
                          />
                          <Input
                            isRequired
                            errorMessage="Please enter date"
                            label="Due Date"
                            labelPlacement="outside"
                            name="dueDate"
                            type="date"
                          />
                          <Input
                            errorMessage="Please enter remarks"
                            label="Remarks"
                            labelPlacement="outside"
                            name="remarks"
                            type="text"
                            placeholder="This must be done in an A4 sheet"
                            min={0}
                          />
                          <Select
                            isRequired
                            defaultSelectedKeys={["In Progress"]}
                            label="Progress of course"
                            labelPlacement="outside"
                            name="progress"
                          >
                            {progress.map((p) => (
                              <SelectItem key={p.key}>{p.label}</SelectItem>
                            ))}
                          </Select>
                          <Select
                            isRequired
                            defaultSelectedKeys={["Low"]}
                            label="Progress of course"
                            labelPlacement="outside"
                            name="priority"
                          >
                            {priority.map((p) => (
                              <SelectItem key={p.key}>{p.label}</SelectItem>
                            ))}
                          </Select>
                          <input type="hidden" value={c.id} name="courseId" />
                        </div>
                        <div>
                          <Button color="primary" type="submit">
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </PopoverContent>
                  </Popover>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div>
                    {todoList
                      .filter((t) => t.progress !== "Completed")
                      ?.filter((t) => t.courseId === c.id)
                      ?.map((t) => (
                        <div key={t.id} className="bg-gray-100 p-2 rounded-lg">
                          <div className="flex gap-2">
                            <Chip
                              color={
                                t.progress === "Not started"
                                  ? "danger"
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

                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleMarkCompleted(t.id)}
                              className="px-2 py-1 bg-green-500 text-white border-none rounded-lg"
                            >
                              Mark completed
                            </button>
                            <button
                              onClick={() => handleDelete(t.id)}
                              className="px-2 py-1 bg-rose-500 text-white border-none rounded-lg"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardBody>
                <Divider />
              </Card>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
