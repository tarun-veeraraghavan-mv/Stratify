import { getCurrentUser, getCurrentUserId } from "@/lib/actions/auth.action";
import { createProfile } from "@/lib/actions/profile.actions";
import { SelectDataOptions } from "@/lib/types/ui/Select";
import Input from "@/ui/Input";
import Select from "@/ui/Select";
import SmallContainer from "@/ui/SmallContainer";
import SubmitButton from "@/ui/SubmitButton";
import { redirect } from "next/navigation";
import React from "react";

const selectData: SelectDataOptions[] = [
  { id: 1, label: "Male", value: "male" },
  { id: 2, label: "Female", value: "female" },
];

export default async function Page() {
  const id = (await getCurrentUserId()) as string;

  if (!id) {
    redirect("/signup");
  }

  const user = await getCurrentUser(parseInt(id));

  return (
    <SmallContainer>
      <form action={createProfile} className="flex gap-4 flex-col">
        <Input
          labelText="Date of birth"
          inputText=""
          name="dateOfBirth"
          type="date"
        />
        <Select labelText="Gender" selectData={selectData} name="gender" />
        <Input
          labelText="College Location"
          inputText="Location"
          name="location"
          type="text"
        />
        <Input
          labelText="Current College"
          inputText="Current College"
          name="currentCollege"
          type="text"
        />
        <Input labelText="Major" inputText="Major" name="major" type="text" />
        <Input labelText="Minor" inputText="Minor" name="minor" type="text" />
        <input type="hidden" name="userId" id="userId" value={user.id} />
        <div>
          <SubmitButton text="Create Profile" />
          <button type="reset">Reset</button>
        </div>
      </form>
    </SmallContainer>
  );
}
