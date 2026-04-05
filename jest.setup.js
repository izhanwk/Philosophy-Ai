require("@testing-library/jest-dom");

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    const { fill, priority, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return require("react").createElement("img", {
      ...rest,
      alt: rest.alt ?? "",
      "data-fill": fill ? "true" : undefined,
      "data-priority": priority ? "true" : undefined,
    });
  },
}));
