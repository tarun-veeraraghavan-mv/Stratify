import Link from "next/link";
import React from "react";

export default function CourseHeader() {
  return (
    <div className="mb-2 flex justify-between align-middle">
      <p className="text-xl font-bold">All of your courses</p>
      <input
        type="text"
        placeholder="Search your courses"
        className="py-1 px-2 bg-gray-300 w-[300px] rounded-lg focus:outline-none focus:ring-0 text-gray-900"
      />
      <Link
        href="/main/courses/add-course"
        className="px-2 py-1 rounded-md border-none bg-emerald-500 text-white cursor-pointer"
      >
        + Add Course
      </Link>
    </div>
  );
}
