import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../page";
import * as firebaseAuth from "../auth/firebaseAuthHelpers";
import { initializeApp } from "firebase/app";

jest.mock("firebase/app", () => ({
  ...jest.requireActual("firebase/app"),
  initializeApp: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn(() => ({})),
  RecaptchaVerifier: jest.fn(() => ({
    whateverProperty: "mockValue",
  })),
}));

jest.mock("firebase/analytics", () => ({
  getAnalytics: jest.fn(),
}));

jest.mock("../auth/firebaseAuthHelpers");
global.prompt = jest.fn();

describe("Landing Page", () => {
  beforeEach(() => {
    initializeApp();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Calls the email sign in function when Email button is clicked", async () => {
    (global.prompt as jest.Mock)
      .mockReturnValueOnce("emmanuel@test.com")
      .mockReturnValueOnce("testing123");
    (firebaseAuth.signInWithEmail as jest.Mock).mockResolvedValue(undefined);
    render(<Home />);
    const emailButton = screen.getByText(/Email/);
    expect(emailButton).toBeInTheDocument();
    fireEvent.click(emailButton);
    expect(firebaseAuth.signInWithEmail).toHaveBeenCalledWith({
      email: "emmanuel@test.com",
      password: "testing123",
    });
  });
  it("Calls Google sign-in function when Google button is clicked", async () => {
    (firebaseAuth.signInWithGoogle as jest.Mock).mockResolvedValue(undefined);
    render(<Home />);
    const googleButton = screen.getByText(/Google/);
    expect(googleButton).toBeInTheDocument();
    fireEvent.click(googleButton);
    expect(firebaseAuth.signInWithGoogle).toHaveBeenCalled();
  });
  it("Calls the phone sign-in funciton when Phone button is clicked", async () => {
    (global.prompt as jest.Mock).mockReturnValue("+1234567890");
    (firebaseAuth.signInWithPhoneNumber as jest.Mock).mockResolvedValue(
      undefined
    );
    render(<Home />);
    const phoneButton = screen.getByText(/Phone #/);
    expect(phoneButton).toBeInTheDocument();
    fireEvent.click(phoneButton);
    expect(firebaseAuth.signInWithPhoneNumber).toHaveBeenCalled();
  });
  it("Renders all main UI elements", () => {
    render(<Home />);
    expect(
      screen.getByText(/Manage your household chores more effectively/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Sign in with:/)).toBeInTheDocument();
    expect(screen.getByText(/Don't have an account?/)).toBeInTheDocument();
    expect(
      screen.getByText(/By continuing, you agree to the/)
    ).toBeInTheDocument();
  });
  it("Toggles the Terms and Conditions", () => {
    render(<Home />);
    const termsAndConds = screen.getByText(/Terms and Conditions/);
    fireEvent.click(termsAndConds);
    const elements = screen.getAllByText(/Lorem ipsum dolor sit amet/);
    expect(elements.length).toBeGreaterThan(0);
    const backButton = screen.getByTestId("ArrowBackIcon");
    fireEvent.click(backButton);
    expect(
      screen.queryByText(/Lorem ipsum dolor sit amet/)
    ).not.toBeInTheDocument();
  });
});
