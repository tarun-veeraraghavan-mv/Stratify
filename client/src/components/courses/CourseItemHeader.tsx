import { Course } from "@/lib/types/course.types";
import React from "react";

interface CourseItemHeader {
  course: Course;
}

export default function CourseItemHeader({ course }: CourseItemHeader) {
  return (
    <div style={{ backgroundColor: course.semesterColor }} className="p-2">
      <p className="text-md font-bold">Semester {course.semesterNumber}</p>
      <p className="text-lg">{course.name}</p>
    </div>
  );
}
