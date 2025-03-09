"use client";

import { Course } from "@/lib/types/course.types";
import React, { useState } from "react";
import CourseHeader from "./CourseHeader";
import CourseItem from "./CourseItem";

interface CourseClientCompProps {
  courses: Course[];
}

export default function CourseClientComp({ courses }: CourseClientCompProps) {
  const [input, setInput] = useState("");

  const filteredCourses =
    input.length > 0
      ? courses.filter((course) => course.name.includes(input))
      : courses;

  return (
    <>
      <CourseHeader input={input} setInput={setInput} />

      <hr />

      <ul className="grid grid-cols-3 gap-3 mt-4">
        {filteredCourses.map((course) => (
          <CourseItem course={course} key={course.id} />
        ))}
      </ul>
    </>
  );
}
