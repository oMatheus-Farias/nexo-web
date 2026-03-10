import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useLayoutEffect, useState } from 'react';

import { useRefreshToken } from '@/app/hooks/mutations/auth/useRefreshToken';
import { useSignOut } from '@/app/hooks/mutations/auth/useSignOut';
import { useStartLoginWithGitHub } from '@/app/hooks/mutations/auth/useStartLoginWithGitHub';
import { useStartLoginWithGoogle } from '@/app/hooks/mutations/auth/useStartLoginWithGoogle';
import { useMe } from '@/app/hooks/queries/user/useMe';
import { AuthTokensManager } from '@/app/lib/AuthTokensManager';
import { Service } from '@/app/services/Services';

import { AuthContext } from '.';

interface IAuthProviderProps {
  children: React.ReactNode;
}

interface ISetupAuthParams {
  accessToken: string;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const { me, loadMe } = useMe({ enabled: false });
  const { startLoginWithGoogleFn, isStartLoginWithGooglePending } = useStartLoginWithGoogle();
  const { startLoginWithGitHubFn, isStartLoginWithGitHubPending } = useStartLoginWithGitHub();
  const { refreshTokenFn } = useRefreshToken();
  const { signOutFn, isSignOutPending } = useSignOut();
  const [isReady, setIsReady] = useState(false);
  const queryClient = useQueryClient();

  const signOut = useCallback(async () => {
    await signOutFn();
    Service.removeAccessToken();
    Service.removeRefreshTokenHandler();

    queryClient.clear();
    AuthTokensManager.clear();
  }, [queryClient, signOutFn]);

  const setupAuth = useCallback(
    async ({ accessToken }: ISetupAuthParams) => {
      Service.setAccessToken(accessToken);
      Service.setRefreshTokenHandler(async () => {
        try {
          const storedTokens = AuthTokensManager.load();
          if (!storedTokens) {
            throw new Error('No tokens found in storage');
          }

          const newTokens = await refreshTokenFn({
            refresh_token: storedTokens.refreshToken,
          });

          Service.setAccessToken(newTokens.access_token);
          AuthTokensManager.save({
            accessToken: newTokens.access_token,
            refreshToken: newTokens.refresh_token,
          });
        } catch (error) {
          await signOut();
          throw error;
        }
      });

      await loadMe();
      setIsReady(true);
    },
    [loadMe, refreshTokenFn, signOut],
  );

  useLayoutEffect(() => {
    async function load() {
      const tokens = AuthTokensManager.load();

      if (!tokens) {
        setIsReady(true);
        return;
      }

      await setupAuth({ accessToken: tokens.accessToken });
    }

    load();
  }, [loadMe, setupAuth]);

  async function startLoginWithGoogle() {
    const { auth_url } = await startLoginWithGoogleFn();
    window.location.href = auth_url;
  }

  async function startLoginWithGitHub() {
    const { auth_url } = await startLoginWithGitHubFn();
    window.location.href = auth_url;
  }

  async function loginWithGoogleCallback({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    AuthTokensManager.save({ accessToken, refreshToken });
    await setupAuth({ accessToken });
  }

  async function loginWithGitHubCallback({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    AuthTokensManager.save({ accessToken, refreshToken });
    await setupAuth({ accessToken });
  }

  if (!isReady) {
    return null;
  }

  const value = {
    me,
    signedIn: !!me,
    isStartLoginWithGooglePending,
    isStartLoginWithGitHubPending,
    isSignOutPending,
    startLoginWithGoogle,
    startLoginWithGitHub,
    loginWithGoogleCallback,
    loginWithGitHubCallback,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
