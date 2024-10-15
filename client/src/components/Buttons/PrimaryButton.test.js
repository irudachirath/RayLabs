import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PrimaryButton from "./PrimaryButton"; // Adjust the import path as necessary

describe("PrimaryButton Component", () => {
  test("renders the button with text", () => {
    render(<PrimaryButton text="Click Me" onClick={() => {}} />);
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<PrimaryButton text="Click Me" onClick={handleClick} />);
    const button = screen.getByText("Click Me");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies translation class conditionally", () => {
    const { rerender } = render(
      <PrimaryButton
        text="No Translate"
        onClick={() => {}}
        removeTranslate={true}
      />
    );
    let button = screen.getByText("No Translate");
    expect(button.className).not.toContain("hover:-translate-y-1");

    rerender(
      <PrimaryButton
        text="Translate"
        onClick={() => {}}
        removeTranslate={false}
      />
    );
    button = screen.getByText("Translate");
    expect(button.className).toContain("hover:-translate-y-1");
  });

  test("renders button with an icon", () => {
    const Icon = () => <span>Icon</span>;
    render(
      <PrimaryButton text="With Icon" onClick={() => {}} icon={<Icon />} />
    );
    const button = screen.getByText("With Icon");
    expect(button).toContainHTML("<span>Icon</span>");
  });
});
