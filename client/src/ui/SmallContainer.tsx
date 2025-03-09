import React from "react";

export default function SmallContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[400px] translate-x-[-50%] absolute translate-y-[-50%] top-[50%] left-[50%] p-4">
      {children}
    </div>
  );
}
