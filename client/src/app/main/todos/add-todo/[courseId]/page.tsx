import { getCurrentUserId } from "@/lib/actions/auth.action";
import { createTodo } from "@/lib/actions/todos.action";
import { SelectDataOptions } from "@/lib/types/ui/Select";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
// import Select from "@/ui/Select";
import SubmitButton from "@/ui/SubmitButton";
import { redirect } from "next/navigation";
import React from "react";

const progressOptions: SelectDataOptions[] = [
  {
    id: 1,
    label: "Not yet started",
    value: "Not Started",
  },
  {
    id: 2,
    label: "In progress",
    value: "In progress",
  },
  {
    id: 3,
    label: "Completed",
    value: "Completed",
  },
];

const priorityOptions: SelectDataOptions[] = [
  {
    id: 1,
    label: "Low priority",
    value: "Low priority",
  },
  {
    id: 2,
    label: "Medium priority",
    value: "Medium priority",
  },
  {
    id: 3,
    label: "High priority",
    value: "High priority",
  },
];

export default async function page({
  params,
}: {
  params: { courseId: string };
}) {
  const id = await getCurrentUserId();

  if (!id) {
    redirect("/signup");
  }

  const { courseId } = await params;
  console.log(courseId);

  return (
    <div className="max-w-[500px] px-[32px] mx-auto my-[20px]">
      <h2 className="text-xl font-bold mb-2">Add todo</h2>
      <form className="flex gap-4 flex-col" action={createTodo}>
        <div className="flex flex-col gap-3">
          <Input
            labelText="Todo name"
            inputText="Todo name"
            name="name"
            type="text"
          />
          <Input
            labelText="Due date"
            inputText="Due date"
            name="dueDate"
            type="date"
          />
          <Select
            labelText="Progress"
            selectData={progressOptions}
            name="progress"
          />
          <Select
            labelText="Priority"
            selectData={priorityOptions}
            name="progress"
          />
          <Input
            labelText="Remarks"
            inputText="Remarks"
            name="remarks"
            type="text"
          />
          <Input
            labelText="Description"
            inputText="Description"
            name="desc"
            type="text"
          />
          <input type="hidden" value={id} name="user_id" id="user_id" />
          <input type="hidden" value={parseInt(courseId)} name="course_id" />
        </div>
        <div>
          <SubmitButton text="Create event" />
        </div>
      </form>
    </div>
  );
}
