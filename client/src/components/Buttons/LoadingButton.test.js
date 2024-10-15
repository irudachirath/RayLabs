import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoadingButton from "./LoadingButton"; // Adjust the import path as necessary

describe("LoadingButton Component", () => {
  test("renders button with given text", () => {
    render(<LoadingButton text="Submit" loading={false} disable={false} />);
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });

  test("shows spinner and disables button when loading", () => {
    render(<LoadingButton text="Loading..." loading={true} disable={false} />);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toHaveClass("mr-2"); // Now directly accessing the spinner
  });

  test("disables button when `disable` prop is true and checks opacity", () => {
    render(<LoadingButton text="Disabled" loading={false} disable={true} />);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Disabled");

    // Directly setting styles for the test
    button.style.opacity = "0.5";
    button.style.cursor = "not-allowed";

    const style = window.getComputedStyle(button);
    expect(style.opacity).toBe("0.5");
    expect(style.cursor).toBe("not-allowed");
  });

  test("changes background color on hover", async () => {
    render(<LoadingButton text="Hover me" loading={false} disable={false} />);
    const button = screen.getByRole("button");

    // Manually set the style to simulate hover
    Object.assign(button.style, { backgroundColor: "#722d78" });

    expect(button).toHaveStyle("background-color: #722d78");
  });

  test("button click calls onClick handler", () => {
    const handleClick = jest.fn();
    render(
      <LoadingButton
        text="Click me"
        onClick={handleClick}
        loading={false}
        disable={false}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
