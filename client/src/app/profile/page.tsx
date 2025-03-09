import { getCurrentUser, getCurrentUserId } from "@/lib/actions/auth.action";
import { createProfile } from "@/lib/actions/profile.actions";
// import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const id = (await getCurrentUserId()) as string;

  const user = await getCurrentUser(parseInt(id));

  return (
    <div>
      <form action={createProfile}>
        <div>
          <label htmlFor="dateOfBirth">Date of birth</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" />
        </div>
        <div>
          <label id="gender">Gender</label>
          <select name="gender" id="gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Location"
          />
        </div>
        <div>
          <label htmlFor="currentCollege">Current college</label>
          <input
            type="text"
            name="currentCollege"
            id="currentCollege"
            placeholder="Current college"
          />
        </div>
        <div>
          <label htmlFor="major">Major</label>
          <input type="text" name="major" id="major" />
        </div>
        <div>
          <label htmlFor="minor">Minor</label>
          <input type="text" name="minor" id="minor" />
        </div>
        <div>
          <input type="hidden" name="userId" id="userId" value={user.id} />
        </div>
        <div>
          <button type="submit">Create profile</button>
          <button type="reset">Reset</button>
        </div>
      </form>
    </div>
  );
}
