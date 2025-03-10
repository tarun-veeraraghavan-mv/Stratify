import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import Page from "../app/login/page";
import { login } from "../lib/actions/auth.action";

vi.mock("../lib/actions/auth.action.ts", () => ({
  login: vi.fn(() => Promise.resolve({ success: true })),
}));

describe("Login", () => {
  test("should have 2 inputs and 1 button", () => {
    render(<Page />);

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  test("user should login on form click", async () => {
    render(<Page />);

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", {
      name: /login/i,
    });

    await user.click(emailInput);
    await user.keyboard("jane@gmail.com");

    await user.click(passwordInput);
    await user.keyboard("jane@1234");

    await user.click(loginButton);

    expect(login).toHaveBeenCalledTimes(1);
  });
});
