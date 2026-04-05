import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BillingCard from "../BillingCard";
import { requestWithRefresh } from "@/lib/clientApi";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { useSearchParams } from "next/navigation";
import type { ReadonlyURLSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("@/lib/clientApi", () => ({
  requestWithRefresh: jest.fn(),
}));

const makeSearchParams = (
  billingValue: string | null = null,
): ReadonlyURLSearchParams =>
  ({
    get: jest.fn((key: string) => (key === "billing" ? billingValue : null)),
  }) as unknown as ReadonlyURLSearchParams;

describe("BillingCard", () => {
  const originalLocation = window.location;
  const alertMock = jest.fn();
  let consoleErrorSpy: jest.SpyInstance;
  const requestWithRefreshMock = requestWithRefresh as jest.MockedFunction<
    typeof requestWithRefresh
  >;

  const makeAxiosResponse = <T,>(data: T): AxiosResponse<T> => ({
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config: { headers: {} } as InternalAxiosRequestConfig,
  });

  beforeAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { href: "http://localhost/dashboard" },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
  });

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    window.alert = alertMock;
    requestWithRefreshMock.mockReset();
    alertMock.mockReset();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    window.location.href = "http://localhost/dashboard";
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("shows the success state from the billing query parameter", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("billing=success"),
    );

    render(
      <BillingCard hasActiveSubscription={false} currentPeriodEnd={null} />,
    );

    expect(
      screen.getByText(/payment received\. your subscription should unlock/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Upgrade now" }),
    ).toBeInTheDocument();
  });

  it("opens checkout and redirects to the returned URL", async () => {
    const user = userEvent.setup();
    requestWithRefreshMock.mockResolvedValue(
      makeAxiosResponse({ url: "https://checkout.example/abc" }),
    );

    render(
      <BillingCard hasActiveSubscription={false} currentPeriodEnd={null} />,
    );

    await user.click(screen.getByRole("button", { name: "Upgrade now" }));

    await waitFor(() => {
      expect(requestWithRefreshMock).toHaveBeenCalledWith({
        url: "/api/billing/checkout",
        method: "POST",
      });
    });
    expect(window.location.href).toBe("https://checkout.example/abc");
  });

  it("shows renewal details and opens the billing portal for active users", async () => {
    const user = userEvent.setup();
    requestWithRefreshMock.mockResolvedValue(
      makeAxiosResponse({ url: "https://portal.example/session" }),
    );

    render(
      <BillingCard
        hasActiveSubscription
        currentPeriodEnd="2026-05-20T00:00:00.000Z"
      />,
    );

    expect(
      screen.getByText(/your higher limit stays active through may 20, 2026/i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Manage subscription" }),
    );

    await waitFor(() => {
      expect(requestWithRefreshMock).toHaveBeenCalledWith({
        url: "/api/billing/portal",
        method: "POST",
      });
    });
    expect(window.location.href).toBe("https://portal.example/session");
  });

  it("alerts the user when opening billing fails", async () => {
    const user = userEvent.setup();
    requestWithRefreshMock.mockRejectedValue(
      new Error("No checkout URL returned"),
    );

    render(
      <BillingCard hasActiveSubscription={false} currentPeriodEnd={null} />,
    );

    await user.click(screen.getByRole("button", { name: "Upgrade now" }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith(
        "Unable to open billing right now. Please try again.",
      );
    });
  });
});
