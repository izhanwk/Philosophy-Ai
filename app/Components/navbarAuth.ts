export type NavbarAuthSnapshot = {
  authed: boolean;
  email: string;
};

export const guestNavbarAuth: NavbarAuthSnapshot = {
  authed: false,
  email: "",
};
