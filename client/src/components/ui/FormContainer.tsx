import React from "react";

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-[1000px] mx-auto my-[50px]">{children}</div>;
}
