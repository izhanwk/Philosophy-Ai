import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HomeClient from "../HomeClient";
import { guestNavbarAuth } from "../Components/navbarAuth";

const signInMock = jest.fn();
const scrollIntoViewMock = jest.fn();

jest.mock("next-auth/react", () => ({
  signIn: (...args: unknown[]) => signInMock(...args),
}));

jest.mock("../Components/Navbar", () => ({
  __esModule: true,
  default: () => <div data-testid="navbar" />,
}));

jest.mock("../Components/Footer", () => ({
  __esModule: true,
  default: () => <div data-testid="footer" />,
}));

describe("HomeClient", () => {
  beforeEach(() => {
    signInMock.mockReset();
    scrollIntoViewMock.mockReset();
  });

  it("starts the Google sign-in flow with the bridge callback", async () => {
    const user = userEvent.setup();

    render(<HomeClient navbarAuth={guestNavbarAuth} />);

    await user.click(
      screen.getByRole("button", { name: /continue with google/i }),
    );

    expect(signInMock).toHaveBeenCalledWith("google", {
      callbackUrl: "/api/auth/bridge",
    });
  });

  it("scrolls to the about section from the hero CTA", async () => {
    const user = userEvent.setup();
    const aboutSection = document.createElement("section");
    aboutSection.id = "aboutus";
    aboutSection.scrollIntoView = scrollIntoViewMock;
    document.body.appendChild(aboutSection);

    render(<HomeClient navbarAuth={guestNavbarAuth} />);

    await user.click(screen.getByRole("button", { name: /learn more/i }));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

    aboutSection.remove();
  });
});
