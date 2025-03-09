import { login } from "@/lib/actions/auth.action";
import Input from "@/ui/Input";
import SmallContainer from "@/ui/SmallContainer";
import SubmitButton from "@/ui/SubmitButton";
import Link from "next/link";

export default function Page() {
  return (
    <SmallContainer>
      <form action={login} className="flex gap-4 flex-col">
        <Input labelText="Email" inputText="Email" name="email" type="email" />

        <Input
          labelText="Password"
          inputText="Password"
          name="password"
          type="password"
        />
        <div>
          <SubmitButton text="Login" />
        </div>
      </form>
      <div className="w-full text-center">
        <Link
          href="/signup"
          className="text-md text-gray-500 border-gray-400 border-b-2 pb-0.5 cursor-pointer hover:border-white"
        >
          Dont have an account? Signin &rarr;
        </Link>
      </div>
    </SmallContainer>
  );
}
