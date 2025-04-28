import React from "react";

export default function CenterContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[400px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] absolute">
      {children}
    </div>
  );
}
