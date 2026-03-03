import { Service } from './Services';

export class AuthService extends Service {
  static async startLoginInWithGoogle(): Promise<AuthService.StartLoginInWithGoogleResponse> {
    const { data } =
      await AuthService.client.post<AuthService.StartLoginInWithGoogleResponse>('/auth/google');

    return data;
  }

  static async refreshToken(
    payload: AuthService.RefreshTokenPayload,
  ): Promise<AuthService.RefreshTokenResponse> {
    const { data } = await this.client.post<AuthService.RefreshTokenResponse>(
      '/auth/refresh-tokens',
      payload,
    );

    return data;
  }

  static async signOut(): Promise<void> {
    await AuthService.client.post('/logout');
  }
}

export namespace AuthService {
  export type StartLoginInWithGoogleResponse = {
    auth_url: string;
    message: string;
  };

  export type RefreshTokenPayload = {
    refresh_token: string;
  };

  export type RefreshTokenResponse = {
    access_token: string;
    refresh_token: string;
  };
}
