"use client";

import { Course } from "@/lib/types/course.types";
import React, { useOptimistic, useState } from "react";
import CourseHeader from "./CourseHeader";
import CourseItem from "./CourseItem";
import { deleteCourse } from "@/lib/actions/course.actions";

interface CourseClientCompProps {
  courses: Course[];
}

export default function CourseClientComp({ courses }: CourseClientCompProps) {
  const [input, setInput] = useState("");

  const [optimisticCourses, optimisticDelete] = useOptimistic(
    courses,
    (curCourses, id) => {
      return curCourses.filter((course) => course.id !== id);
    }
  );

  async function handleDelete(courseId: number) {
    optimisticDelete(courseId);
    await deleteCourse(courseId);
  }

  const filteredCourses =
    input.length > 0
      ? courses.filter((course) =>
          course.name.toLowerCase().includes(input.toLowerCase())
        )
      : courses;

  return (
    <>
      <CourseHeader input={input} setInput={setInput} />

      <hr />

      <ul className="lg:grid lg:grid-cols-3 gap-3 mt-4 md:grid md:grid-cols-2 grid grid-cols-1">
        {input.length === 0 && filteredCourses.length === 0 && (
          <p className="font-bold text-lg">
            👋 No course yet! Start by adding one
          </p>
        )}
        {input.length > 0 ? (
          filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseItem
                course={course}
                key={course.id}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <p className="font-bold text-lg">👋 No course for this search</p>
          )
        ) : (
          optimisticCourses.map((course) => (
            <CourseItem
              course={course}
              key={course.id}
              handleDelete={handleDelete}
            />
          ))
        )}
      </ul>
    </>
  );
}
