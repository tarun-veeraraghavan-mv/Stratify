"use client";

import { Button, Input } from "@heroui/react";
import React from "react";

export default function PageHeader({
  resource,
  input,
  setInput,
  children,
}: {
  resource: string;
  input: string;
  setInput: (val: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between border-b-2 border-gray-300 pb-3">
      <h1 className="text-2xl font-bold">All of your {resource}</h1>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-[400px]"
        placeholder="Search your courses"
      />
      <div className="flex gap-2">{children}</div>
    </div>
  );
}
