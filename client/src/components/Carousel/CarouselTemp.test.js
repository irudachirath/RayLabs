import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import CarouselTemp from "./CarouselTemp"; // Adjust the import path as necessary

describe("CarouselTemp Component", () => {
  const mockImages = [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
    "https://example.com/image3.jpg",
  ];

  test("renders all provided images", async () => {
    render(<CarouselTemp images={mockImages} />);

    // Wait for all images to be rendered
    const images = await waitFor(() => screen.getAllByRole("img"));

    // Check if the number of rendered images matches the mock images
    expect(3).toBe(mockImages.length); // Remove the parentheses after length

    // Check if the correct src and alt attributes are applied to each image
    images.forEach((img, index) => {
      expect(img).toHaveAttribute("src", mockImages[index]);
      expect(img).toHaveAttribute("alt", "Report Image");
    });
  });

  test("renders correctly with no images", () => {
    render(<CarouselTemp images={[]} />);
    expect(screen.queryByRole("img")).toBeNull();
  });
});
