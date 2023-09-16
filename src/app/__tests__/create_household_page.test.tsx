import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CreateHouseHold from "../create/page";

describe("CreateHouseHold Component", () => {
  test("renders without crashing", () => {
    render(<CreateHouseHold />);
    expect(
      screen.getByPlaceholderText("Enter household name")
    ).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument(); // Assuming the modal uses a dialog role.
  });

  describe("Email Interactions", () => {
    test("adds a valid email correctly", () => {
      render(<CreateHouseHold />);
      const input = screen.getByPlaceholderText("invite house member");
      fireEvent.change(input, { target: { value: "test@email.com" } });
      fireEvent.click(screen.getByText("Invite"));
      expect(screen.getByText("test@email.com")).toBeInTheDocument();
    });

    test("shows error for invalid email", () => {
      render(<CreateHouseHold />);
      const input = screen.getByPlaceholderText("invite house member");
      fireEvent.change(input, { target: { value: "invalidEmail" } });
      fireEvent.click(screen.getByText("Invite"));
      expect(
        screen.getByText(
          "invalidEmail is an invalid email, please enter a valid email."
        )
      ).toBeInTheDocument();
    });

    test("shows error for duplicate email", () => {
      render(<CreateHouseHold />);
      const input = screen.getByPlaceholderText("invite house member");
      fireEvent.change(input, { target: { value: "test@email.com" } });
      fireEvent.click(screen.getByText("Invite"));

      // Try adding the same email again
      fireEvent.change(input, { target: { value: "test@email.com" } });
      fireEvent.click(screen.getByText("Invite"));

      expect(
        screen.getByText(
          "test@email.com has already been added. Please enter a unique email."
        )
      ).toBeInTheDocument();
    });

    // 3. Removing Emails
    test("removes an email", () => {
      render(<CreateHouseHold />);

      // Add an email
      const input = screen.getByPlaceholderText("invite house member");
      fireEvent.change(input, { target: { value: "test@email.com" } });
      fireEvent.click(screen.getByText("Invite"));

      // Open the modal and delete the email
      fireEvent.click(screen.getByText("test@email.com"));
      fireEvent.click(screen.getByText("x"));

      expect(screen.queryByText("test@email.com")).not.toBeInTheDocument();
    });
  });

  describe("Modal Interactions", () => {
    test("opens and closes the EmailModal", () => {
      render(<CreateHouseHold />);

      // Simulate the addition of an email
      const emailInput = screen.getByPlaceholderText("invite house member");
      fireEvent.change(emailInput, { target: { value: "test@email.com" } });
      fireEvent.click(screen.getByText("Invite"));

      // Check that email tab is displayed
      const emailTab = screen.getByText(/test@email.com/);
      expect(emailTab).toBeInTheDocument();

      // Click on the emailTab div to open the modal
      fireEvent.click(emailTab);

      // Check that modal opened by looking for the Close button
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Close")).toBeInTheDocument();

      // Simulate closing the modal
      fireEvent.click(screen.getByText("Close"));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("Dropdown and Create Button Interactions", () => {
    // 6. Dropdown Interaction
    test("selects a household size", () => {
      render(<CreateHouseHold />);
      const dropdown = screen.getByText("How big is your household");
      fireEvent.change(dropdown, { target: { value: "3" } });
      expect((dropdown as HTMLSelectElement).value).toBe("3");
    });

    // 7. Create Button
    test("clicks the Create button", () => {
      render(<CreateHouseHold />);
      fireEvent.click(screen.getByText("Create"));
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
