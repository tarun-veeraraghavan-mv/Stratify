import { signup } from "@/lib/actions/auth.action";
import React from "react";

export default function Page() {
  return (
    <div>
      <form action={signup}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Name" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" name="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
          />
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
}
