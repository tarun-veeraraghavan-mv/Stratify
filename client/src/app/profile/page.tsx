import { getCurrentUser, getCurrentUserId } from "@/lib/actions/auth.action";
import React from "react";

export default async function Page() {
  const id = (await getCurrentUserId()) as string;
  const user = await getCurrentUser(parseInt(id));

  return (
    <div>
      ID: {user.name}
      <p>{user.email}</p>
    </div>
  );
}
