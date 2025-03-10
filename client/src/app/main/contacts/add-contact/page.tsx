import { getCurrentUserId } from "@/lib/actions/auth.action";
import { createContact } from "@/lib/actions/contact.action";
import Input from "@/ui/Input";
import SubmitButton from "@/ui/SubmitButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function page() {
  const id = (await getCurrentUserId()) as string;

  if (!id) {
    redirect("/");
  }

  return (
    <div className="max-w-[500px] px-[32px] mx-auto my-[20px]">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-2">Add course</h2>
        <Link href="/main/contacts" className="underline">
          &larr; Go back
        </Link>
      </div>
      <form className="flex gap-4 flex-col" action={createContact}>
        <div className="flex flex-col gap-3">
          <Input
            labelText="Name of person"
            inputText="Name of person"
            name="name"
            type="text"
          />
          <Input labelText="Role" inputText="Role" name="role" type="text" />
          <Input
            labelText="Email"
            inputText="Email"
            name="email"
            type="email"
          />
          <Input
            labelText="Phone"
            inputText="Phone"
            name="phone"
            type="phone"
          />
          <Input
            labelText="Birth date"
            inputText=""
            name="birthDate"
            type="date"
          />
          <input type="hidden" value={parseInt(id)} name="user_id" />
        </div>
        <div>
          <SubmitButton text="Create contact" />
        </div>
      </form>
    </div>
  );
}
