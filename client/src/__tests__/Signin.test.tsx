import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import Page from "../app/page";
import { signup } from "../lib/actions/auth.action";

vi.mock("../lib/actions/auth.action.ts", () => ({
  signup: vi.fn(() => Promise.resolve({ success: true })),
}));

describe("Signin", () => {
  test("the form should show 3 inputs and 1 button and 1 link", () => {
    render(<Page />);

    const usernameInput = screen.getByRole("textbox", {
      name: /username/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const signinButton = screen.getByRole("button", {
      name: /signin/i,
    });
    const navLink = screen.getByRole("link", {
      name: /have an account\? Login/i,
    });

    expect(usernameInput).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(signinButton).toBeDefined();
    expect(navLink).toBeDefined();
  });

  test("should be able to type in inputs", async () => {
    render(<Page />);

    const usernameInput = screen.getByRole("textbox", {
      name: /username/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const signinButton = screen.getByRole("button", {
      name: /signin/i,
    });

    await user.click(usernameInput);
    await user.keyboard("jane");

    await user.click(emailInput);
    await user.keyboard("jane@gmail.com");

    await user.click(passwordInput);
    await user.keyboard("test1234");

    await user.click(signinButton);

    expect(signup).toHaveBeenCalledTimes(1);
  });
});
