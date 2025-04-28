"use client";

import PageHeader from "@/components/ui/PageHeader";
import { deleteCourse, markCourseCompleted } from "@/lib/actions/course";
import { CoursePayload } from "@/lib/types/model";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

export default function CoursePageClient({
  courses,
}: {
  courses: CoursePayload;
}) {
  const [courseList, setCourseList] = useState(courses.course);
  const [input, setInput] = useState("");

  const filteredCourse =
    input !== ""
      ? courseList
          .filter((c) => c.progress !== "Completed")
          .filter((c) => c.name.includes(input))
      : courseList.filter((c) => c.progress !== "Completed");

  async function handleDelete(id: number) {
    await deleteCourse(id);
    setCourseList((prev) => prev.filter((c) => c.id !== id));
  }

  async function handleMarkCompleted(id: number) {
    await markCourseCompleted(id);
    setCourseList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, progress: "Completed" } : c))
    );
  }

  return (
    <div>
      <PageHeader resource="courses" input={input} setInput={setInput}>
        <Button
          as={Link}
          color="success"
          href="/main/courses/create"
          variant="solid"
        >
          Create new course
        </Button>
        <Button
          as={Link}
          color="secondary"
          href="/main/courses/files"
          variant="solid"
        >
          View your files
        </Button>
      </PageHeader>
      <div>
        <div className="grid grid-cols-3 gap-3 py-2">
          {filteredCourse.length === 0 ? (
            <p>You have no courses in the list</p>
          ) : (
            filteredCourse.map((c) => (
              <Card className="max-w-[400px]" key={c.id}>
                <CardHeader
                  className="flex gap-3"
                  style={{ backgroundColor: c.semesterColor }}
                >
                  <div className="flex flex-col">
                    <p className="text-xl font-bold">{c.name}</p>
                    <p className="text-lg">
                      Semester number: {c.semesterNumber}
                    </p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="flex gap-2 mb-2">
                    <Chip
                      color={
                        c.difficulty === "Easy"
                          ? "success"
                          : c.difficulty === "Medium"
                          ? "warning"
                          : "danger"
                      }
                    >
                      {c.difficulty}
                    </Chip>
                    <Chip
                      color={
                        c.progress === "Not started" ? "danger" : "warning"
                      }
                    >
                      {c.progress}
                    </Chip>
                  </div>
                  <ul className="mb-2">
                    <li>
                      <span className="font-bold">Proffessor name:</span>{" "}
                      {c.proffessorName}
                    </li>
                    <li>
                      <span className="font-bold">Start date:</span>{" "}
                      {c.startDate}
                    </li>
                    <li>
                      <span className="font-bold">End date:</span> {c.endDate}
                    </li>
                    <li>
                      <span className="font-bold">Grade:</span> {c.grade}
                    </li>
                  </ul>
                  <div className="flex gap-2">
                    <Link
                      href={`/main/courses/update/${c.id}`}
                      className="px-2 py-1 bg-yellow-500 text-white border-none rounded-lg"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="px-2 py-1 bg-rose-500 text-white border-none rounded-lg"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleMarkCompleted(c.id)}
                      className="px-2 py-1 bg-green-500 text-white border-none rounded-lg"
                    >
                      Mark completed
                    </button>
                  </div>
                </CardBody>
                <Divider />
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
