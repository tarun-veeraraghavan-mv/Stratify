import { login } from "@/lib/actions/auth.action";

export default function Page() {
  return (
    <div>
      <form action={login}>
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
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
