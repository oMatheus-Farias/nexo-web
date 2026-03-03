import { createContext } from 'react';

interface IAuthContextValue {
  signedIn: boolean;
  isStartLoginWithGooglePending: boolean;
  isSignOutPending: boolean;
  startLoginWithGoogle: () => Promise<void>;
  loginWithGoogleCallback: (params: { accessToken: string; refreshToken: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);
