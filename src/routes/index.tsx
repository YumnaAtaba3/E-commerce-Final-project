export const appRoutes = {
  home: "/",
  products: {
    list: "/products",
    details: (id: string | number) => `/products/${id}`,
  },
  wishlist: "/wishlist",
  cart: "/cart",
  about: "/about",
  contact:"/contact",
  checkout:"/checkout",
  auth: {
    login: "/login",
    signUp: "/sign-up",
  },
};
