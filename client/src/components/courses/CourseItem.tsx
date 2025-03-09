import { Course } from "@/lib/types/course.types";
import CourseDifficultyChip from "@/ui/CourseDifficultyChip";
import React from "react";

interface CourseItemProps {
  course: Course;
}

export default function CourseItem({ course }: CourseItemProps) {
  return (
    <li key={course.id} className="rounded-lg shadow-2xl overflow-hidden">
      <div style={{ backgroundColor: course.semesterColor }} className="p-2">
        <p className="text-md font-bold">Semester {course.semesterNumber}</p>
        <p className="text-lg">{course.name}</p>
      </div>
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
        <ul className="mt-3">
          <p>👩‍🏫 Proffessor name: {course.proffessorName}</p>
          <li className="flex gap-3">
            <p>⏰ Start time: {course.startTime}</p>
            <p>⏰ End time: {course.endTime}</p>
          </li>
          <li>✍🏻 Course desc: {course.desc}</li>
          <li>⭐️ Grade: {course.grade}</li>
        </ul>
      </div>
    </li>
  );
}
