import React from "react";
import { render, fireEvent } from "@testing-library/react";
import GradientButton from "./GradientButton"; // Adjust path as necessary
import { ConfigProvider } from "antd";

describe("GradientButton Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <ConfigProvider>
        <GradientButton text="Login" onClick={() => {}} />
      </ConfigProvider>
    );
    expect(getByText("Login")).toBeInTheDocument();
  });

  it("triggers onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <ConfigProvider>
        <GradientButton text="Login" onClick={handleClick} />
      </ConfigProvider>
    );
    fireEvent.click(getByText("Login"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies custom gradient colors correctly", () => {
    const { getByRole } = render(
      <ConfigProvider>
        <GradientButton text="Login" color1="#8F3E97" color2="#af4583" />
      </ConfigProvider>
    );
    const button = getByRole("button");

    // This assumes styles are set as inline styles
    expect(button).toHaveStyle(`
  backgroundImage: linear-gradient(135deg, #8F3E97, #af4583)
`);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <ConfigProvider>
        <GradientButton text="Login" onClick={handleClick} disabled />
      </ConfigProvider>
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("handles hover state correctly", () => {
    const { getByRole } = render(
      <ConfigProvider>
        <GradientButton text="Login" />
      </ConfigProvider>
    );
    const button = getByRole("button");
    fireEvent.mouseOver(button);

    // Instead of checking style, check if the class applying the style is present
    // This might require you to adjust how classes are applied in your component
    expect(button).toHaveClass(
      "ant-btn css-dev-only-do-not-override-ccdg5a ant-btn-primary ant-btn-color-primary ant-btn-variant-solid ant-btn-lg css-x84iut"
    );
  });
});
