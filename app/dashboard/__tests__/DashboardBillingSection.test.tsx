import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DashboardBillingSection from "../DashboardBillingSection";

jest.mock("../../Components/BillingCard", () => ({
  __esModule: true,
  default: ({
    hasActiveSubscription,
    currentPeriodEnd,
  }: {
    hasActiveSubscription: boolean;
    currentPeriodEnd: string | null;
  }) => (
    <div data-testid="billing-card">
      Billing card: {hasActiveSubscription ? "active" : "inactive"} /{" "}
      {currentPeriodEnd ?? "none"}
    </div>
  ),
}));

describe("DashboardBillingSection", () => {
  it("opens and closes the Pro details modal", async () => {
    const user = userEvent.setup();

    render(
      <DashboardBillingSection
        hasActiveSubscription={false}
        currentPeriodEnd={null}
      />,
    );

    expect(screen.queryByTestId("billing-card")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Get Pro" }));
    expect(screen.getByTestId("billing-card")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close billing popup" }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Close billing popup" }),
    );
    expect(screen.queryByTestId("billing-card")).not.toBeInTheDocument();
  });

  it("shows the active membership copy for subscribed users", () => {
    render(
      <DashboardBillingSection
        hasActiveSubscription
        currentPeriodEnd="2026-05-20T00:00:00.000Z"
      />,
    );

    expect(
      screen.getByText("Your Pro membership is active"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open Pro details" }),
    ).toBeInTheDocument();
  });
});
