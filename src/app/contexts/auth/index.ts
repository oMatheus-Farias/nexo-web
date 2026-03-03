import { createContext } from 'react';

interface IAuthContextValue {
  signedIn: boolean;
  startLoginWithGoogle: () => Promise<void>;
  loginWithGoogleCallback: (params: { accessToken: string; refreshToken: string }) => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextValue);
