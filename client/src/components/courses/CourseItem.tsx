"use client";

import { Course } from "@/lib/types/course.types";
import CourseDifficultyChip from "@/ui/CourseDifficultyChip";
import React, { useTransition } from "react";
import CourseItemHeader from "./CourseItemHeader";

interface CourseItemProps {
  course: Course;
  handleDelete: (id: number) => void;
}

// const [optimisicState, setterFunction -> will use] = useOptimistic(realState, (curState, id) => {
//  return curBookings.filter() -> function
// })
// async function handleDelete(bookingId) {
//  setterFunction(bookingId)
//  await realFunc(bookingId)
// }
// use handleDelete() in the real onClick area
// optimisticState in map function

export default function CourseItem({ course, handleDelete }: CourseItemProps) {
  const [isPending, startTransition] = useTransition();

  function deleteCourse() {
    startTransition(() => handleDelete(course.id));
  }

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <li key={course.id} className="rounded-lg shadow-2xl overflow-hidden">
      <CourseItemHeader course={course} />
      <hr />
      <div className="py-3 px-2">
        <div className="flex gap-2 align-middle">
          <CourseDifficultyChip difficulty={course.difficulty} />
          <p
            className={`p-1 rounded-lg ${
              course.progress === "In progress"
                ? "bg-orange-300"
                : course.progress === "Completed"
                  ? "bg-green-300"
                  : "bg-red-300"
            } `}
          >
            {course.progress}
          </p>
        </div>
        <ul className="mt-3 mb-2">
          <p>👩‍🏫 Proffessor name: {course.proffessorName}</p>
          <li className="flex gap-3">
            <p>⏰ Start time: {course.startTime}</p>
            <p>⏰ End time: {course.endTime}</p>
          </li>
          <li>✍🏻 Course desc: {course.desc}</li>
          <li>⭐️ Grade: {course.grade}</li>
        </ul>
        <div className="flex gap-2">
          <button
            className="bg-red-500 p-1 text-white rounded-lg cursor-pointer"
            onClick={deleteCourse}
          >
            Delete course
          </button>
        </div>
      </div>
    </li>
  );
}
