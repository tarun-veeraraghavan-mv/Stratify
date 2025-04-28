"use client";

import { markCourseUncompleted } from "@/lib/actions/course";
import { CoursePayload } from "@/lib/types/model";
import { Accordion, AccordionItem } from "@heroui/react";
import { Card, CardBody, CardHeader, Chip, Divider } from "@heroui/react";

export default function AccordianComp({ courses }: { courses: CoursePayload }) {
  const semesterNumbers = new Set(
    courses.course
      .filter((c) => c.progress === "Completed")
      .map((c) => c.semesterNumber)
  );

  const semesterArrays = Array.from(semesterNumbers).sort((a, b) => a - b);

  console.log(semesterArrays);

  return (
    <div>
      {semesterArrays.length === 0 ? (
        <p>You havent completed any courses yet!</p>
      ) : (
        semesterArrays.map((n) => (
          <div key={n}>
            <Accordion>
              <AccordionItem
                key={n}
                title={`Semester ${n}`}
                subtitle="Press to expand"
              >
                <div className="grid grid-cols-3 gap-3">
                  {courses.course
                    .filter((c) => c.progress === "Completed")
                    .filter((c) => c.semesterNumber === n)
                    .map((c) => (
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
                                c.progress === "Not started"
                                  ? "danger"
                                  : "warning"
                              }
                            >
                              {c.progress}
                            </Chip>
                          </div>
                          <ul className="mb-2">
                            <li>
                              <span className="font-bold">
                                Proffessor name:
                              </span>{" "}
                              {c.proffessorName}
                            </li>
                            <li>
                              <span className="font-bold">Start date:</span>{" "}
                              {c.startDate}
                            </li>
                            <li>
                              <span className="font-bold">End date:</span>{" "}
                              {c.endDate}
                            </li>
                            <li>
                              <span className="font-bold">Grade:</span>{" "}
                              {c.grade}
                            </li>
                          </ul>
                          <div>
                            <button
                              onClick={() => markCourseUncompleted(c.id)}
                              className="px-2 py-1 bg-gray-300 rounded-lg"
                            >
                              Mark uncompleted
                            </button>
                          </div>
                        </CardBody>
                      </Card>
                    ))}
                </div>
              </AccordionItem>
            </Accordion>
          </div>
        ))
      )}
      {/* <Accordion>
        {courses.course.map((c) => (
          // <AccordionItem key={c.id}>{defaultContent}</AccordionItem>
        ))}
      </Accordion> */}
    </div>
  );
}
