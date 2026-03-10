import { createContext } from 'react';

import type { UserService } from '@/app/services/UserService';

interface IAuthContextValue {
  me: UserService.GetMeDetailsResponse | undefined;
  signedIn: boolean;
  isStartLoginWithGooglePending: boolean;
  isStartLoginWithGitHubPending: boolean;
  isSignOutPending: boolean;
  startLoginWithGoogle: () => Promise<void>;
  startLoginWithGitHub: () => Promise<void>;
  loginWithGoogleCallback: (params: { accessToken: string; refreshToken: string }) => Promise<void>;
  loginWithGitHubCallback: (params: { accessToken: string; refreshToken: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);
