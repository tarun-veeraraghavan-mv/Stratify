"use client";

import FormContainer from "@/components/ui/FormContainer";
import { createCourse } from "@/lib/actions/course";
import { Button, Form, Input, Select, SelectItem } from "@heroui/react";

export default function page() {
  const progress = [
    { key: "Not started", label: "Not started" },
    { key: "In Progress", label: "In Progress" },
  ];

  const difficulty = [
    { key: "Easy", label: "Easy" },
    { key: "Medium", label: "Medium" },
    { key: "Hard", label: "Hard" },
  ];

  const semesterColors = [
    { key: "#ff6467", label: "Red" },
    { key: "#ffb86a", label: "Orange" },
    { key: "#fdc700", label: "Gold" },
    { key: "#05df72", label: "Green" },
    { key: "#00d3f2", label: "Cyan" },
  ];

  return (
    <FormContainer>
      <h1 className="text-2xl font-bold mb-7">Create a new course</h1>
      <Form className="grid grid-cols-2 gap-5" action={createCourse}>
        <Input
          isRequired
          errorMessage="Please enter the semester number"
          label="Semester number"
          labelPlacement="outside"
          name="semesterNumber"
          type="number"
          placeholder="3"
          min={0}
        />
        <Input
          isRequired
          errorMessage="Please enter a name"
          label="Couse name"
          labelPlacement="outside"
          name="name"
          placeholder="Math 101"
          type="text"
        />
        <Input
          isRequired
          errorMessage="Please enter a professor name"
          label="Proffessor name"
          labelPlacement="outside"
          name="proffessorName"
          placeholder="Mr. Ellis"
          type="text"
        />
        <Input
          isRequired
          errorMessage="Please enter a description"
          label="Course description"
          labelPlacement="outside"
          name="description"
          placeholder="This is my favorite course!"
          type="text"
        />
        <Input
          isRequired
          errorMessage="Please enter a start date"
          label="Start date"
          labelPlacement="outside"
          name="startDate"
          type="date"
        />
        <Input
          isRequired
          errorMessage="Please enter a end date"
          label="End date"
          labelPlacement="outside"
          name="endDate"
          type="date"
        />
        <Input
          isRequired
          errorMessage="Please enter a start time"
          label="Start time"
          labelPlacement="outside"
          name="startTime"
          type="time"
        />
        <Input
          isRequired
          errorMessage="Please enter a end time"
          label="End time"
          labelPlacement="outside"
          name="endTime"
          type="time"
        />

        <Select
          isRequired
          defaultSelectedKeys={["In Progress"]}
          label="Progress of course"
          labelPlacement="outside"
          name="progress"
        >
          {progress.map((p) => (
            <SelectItem key={p.key}>{p.label}</SelectItem>
          ))}
        </Select>

        <Input
          isRequired
          errorMessage="Please enter the grade"
          label="Grade"
          labelPlacement="outside"
          name="grade"
          type="number"
          placeholder="3"
          min={0}
        />

        <Select
          isRequired
          defaultSelectedKeys={["easy"]}
          label="Difficulty of course"
          labelPlacement="outside"
          name="difficulty"
        >
          {difficulty.map((d) => (
            <SelectItem key={d.key}>{d.label}</SelectItem>
          ))}
        </Select>
        <Select
          isRequired
          defaultSelectedKeys={["#ff6467"]}
          label="Semester color"
          labelPlacement="outside"
          name="semesterColor"
        >
          {semesterColors.map((col) => (
            <SelectItem key={col.key}>{col.label}</SelectItem>
          ))}
        </Select>
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
}
