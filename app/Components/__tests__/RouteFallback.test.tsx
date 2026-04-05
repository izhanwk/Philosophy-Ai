import { render, screen } from "@testing-library/react";
import RouteFallback from "../RouteFallback";

describe("RouteFallback", () => {
  it("renders the default loading copy", () => {
    render(<RouteFallback />);

    expect(screen.getByText("Philosopher AI")).toBeInTheDocument();
    expect(
      screen.getByText("Preparing your next conversation..."),
    ).toBeInTheDocument();
  });

  it("renders a custom label when provided", () => {
    render(<RouteFallback label="Opening the dashboard..." />);

    expect(screen.getByText("Opening the dashboard...")).toBeInTheDocument();
  });
});
