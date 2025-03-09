import { getCurrentUser, getCurrentUserId } from "@/lib/actions/auth.action";
import { createCourse } from "@/lib/actions/course.actions";
import { SelectDataOptions } from "@/lib/types/ui/Select";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import SubmitButton from "@/ui/SubmitButton";
import { redirect } from "next/navigation";

const difficultOptions: SelectDataOptions[] = [
  {
    id: 1,
    label: "Easy",
    value: "easy",
  },
  {
    id: 2,
    label: "Medium",
    value: "medium",
  },
  {
    id: 3,
    label: "Difficult",
    value: "difficult",
  },
];

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

const colorOptions: SelectDataOptions[] = [
  {
    id: 1,
    value: "#7DD3FC",
    label: "Blue",
  },
  {
    id: 2,
    value: "#2DD4BF",
    label: "Teal",
  },
  {
    id: 3,
    value: "#A3E635",
    label: "Lime",
  },
  {
    id: 4,
    value: "#F87171",
    label: "Red",
  },
  {
    id: 5,
    value: "#FB923C",
    label: "Orange",
  },
];

export default async function page() {
  const id = (await getCurrentUserId()) as string;

  if (!id) {
    redirect("/signup");
  }

  const user = await getCurrentUser(parseInt(id));

  return (
    <div className="max-w-[500px] px-[32px] mx-auto my-[20px]">
      <h2 className="text-xl font-bold mb-2">Add course</h2>
      <form className="flex gap-4 flex-col" action={createCourse}>
        <div className="flex flex-col gap-3">
          <Input
            labelText="Semester Number"
            inputText="Semester Number"
            name="semesterNumber"
            type="number"
          />
          <Input labelText="Name" inputText="Name" name="name" type="text" />
          <Input
            labelText="Proffessor name"
            inputText="Professor name"
            name="proffessorName"
            type="text"
          />
          <Input
            labelText="Description"
            inputText="Description"
            name="desc"
            type="text"
          />
          <Input
            labelText="Start date"
            inputText="Start date"
            name="startDate"
            type="date"
          />
          <Input
            labelText="End date"
            inputText="End date"
            name="endDate"
            type="date"
          />
          <Input
            labelText="Start time"
            inputText="Start time"
            name="startTime"
            type="time"
          />
          <Input
            labelText="End time"
            inputText="End time"
            name="endTime"
            type="time"
          />
          <Select
            labelText="Progress"
            selectData={progressOptions}
            name="progress"
          />
          <Input
            labelText="Grade"
            inputText="Grade"
            name="grade"
            type="number"
          />
          <Select
            labelText="Difficulty"
            selectData={difficultOptions}
            name="difficulty"
          />
          <Select
            labelText="Color"
            selectData={colorOptions}
            name="semesterColor"
          />
          <input type="hidden" value={user.id} name="user_id" id="user_id" />
        </div>
        <div>
          <SubmitButton text="Create event" />
        </div>
      </form>
    </div>
  );
}
