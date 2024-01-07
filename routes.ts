/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/verification"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = ["/auth/sign-in", "/auth/sign-up", "/auth/error", "/auth/reset", "/auth/new-password"];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_SIGN_IN_REDIRECT = "/";

/**
 * ```js
 * // for currentTitle sample
  const params = useParams();
  const pathname = usePathname();
  const protectId = `/${params.protectId}/settings/profile`;
  const currentTitle =
  (profileIdParams(protectId)
    .map((item) => ({ ...item, match: pathname.startsWith(item.href) }))
    .filter((item) => item.match)
    .sort((a, b) => b.href.length - a.href.length)[0] || profileIdParams(params.protectId)[0])?.title || "";

  console.log(currentTitle); // title
 * ```
 * @param protectId profileId
 * @returns profileIdParams
 */
export const profileIdParams = (protectId: string | string[]) => [
  {
    title: "Profile",
    description: "Manage your profile preferences",
    href: `/${protectId}/settings/profile/`,
  },
  {
    title: "Address",
    description: "Manage your address preferences",
    href: `/${protectId}/settings/profile/address`,
  },
  {
    title: "Social Media",
    description: "Manage social media preferences",
    href: `/${protectId}/settings/profile/social-media`,
  },
  {
    title: "Add Params",
    description: "Manage new route for your audience preferences.",
    href: `/${protectId}/settings/profile/add-params`,
  },
  {
    title: "List API",
    description: "Manage API for frontend preferences",
    href: `/${protectId}/settings/profile/list-api`,
  },
];

/**
 * ```js
// Find the matching title based on the current pathname
  const pathname = usePathname();
  const currentTitle = currentHeading({ pathname, routes: profileIdParams(params.protectId), viewing: "title" });
 * ```
 * @param property routes, pathname, viewing
 * @returns currentHeading
 */
export const currentHeading = ({
  routes,
  pathname,
  viewing,
}: {
  routes: {
    title: string;
    description: string;
    href: string;
  }[];
  pathname: string;
  viewing: "title" | "description";
}) =>
  viewing === "title"
    ? (
        routes
          .map((item) => ({ ...item, match: pathname.startsWith(item.href) }))
          .filter((item) => item.match)
          .sort((a, b) => b.href.length - a.href.length)[0] || routes[0]
      )?.title || ""
    : (
        routes
          .map((item) => ({ ...item, match: pathname.startsWith(item.href) }))
          .filter((item) => item.match)
          .sort((a, b) => b.href.length - a.href.length)[0] || routes[0]
      )?.description || "";
