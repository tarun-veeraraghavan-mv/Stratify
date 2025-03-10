import { signup } from "@/lib/actions/auth.action";
import Input from "@/ui/Input";
import SmallContainer from "@/ui/SmallContainer";
import SubmitButton from "@/ui/SubmitButton";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <SmallContainer>
      <form action={signup} className="flex gap-4 flex-col">
        <Input
          labelText="Username"
          inputText="Username"
          name="name"
          type="text"
        />

        <Input labelText="Email" inputText="Email" name="email" type="email" />

        <Input
          labelText="Password"
          inputText="Password"
          name="password"
          type="password"
        />
        <div>
          <SubmitButton text="Signin" />
        </div>
        <div className="w-full text-center">
          <Link
            href="/login"
            className="text-md text-gray-500 border-gray-400 border-b-2 pb-0.5 cursor-pointer hover:border-white"
          >
            Have an account? Login &rarr;
          </Link>
        </div>
      </form>
    </SmallContainer>
  );
}
