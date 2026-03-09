export const ROUTE_PATHS = {
  login: '/login',
  googleCallback: '/auth/google/callback',
  githubCallback: '/auth/github/callback',

  // User
  userHome: '/home',
  userRepositories: '/repositories',
  userConfiguration: '/configuration',
} as const;
