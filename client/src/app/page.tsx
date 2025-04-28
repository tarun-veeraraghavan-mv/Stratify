"use client";

import CenterContainer from "@/components/ui/CenterContainer";
import { signin } from "@/lib/actions/auth";
import { Button, Form, Input } from "@heroui/react";
import { FormEvent, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const res = await signin(email, password);

    console.log(res);
  }

  return (
    <CenterContainer>
      <h1 className="text-3xl font-bold mb-4">Create your account today</h1>
      <Form onSubmit={handleSubmit}>
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          labelPlacement="outside"
          name="email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          name="password"
          placeholder="Enter your password"
          type="text"
          validate={(val) => {
            if (val.length < 3) {
              return "Password must be greater than 3 charecters";
            }

            if (val.length > 24) {
              return "Password must be less than 24 charecters";
            }
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <Button color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="flat">
            Reset
          </Button>
        </div>
      </Form>
    </CenterContainer>
  );
}
