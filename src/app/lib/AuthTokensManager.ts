export class AuthTokensManager {
  private static KEY = '@nexo:auth_tokens';

  static save(token: AuthTokensManager.Tokens) {
    localStorage.setItem(this.KEY, JSON.stringify(token));
  }

  static clear() {
    localStorage.removeItem(this.KEY);
  }

  static load(): AuthTokensManager.Tokens | null {
    try {
      const storedTokens = localStorage.getItem(this.KEY);

      if (!storedTokens) {
        return null;
      }

      return JSON.parse(storedTokens) as AuthTokensManager.Tokens;
    } catch {
      return null;
    }
  }
}

namespace AuthTokensManager {
  export type Tokens = {
    refreshToken: string;
  };
}
