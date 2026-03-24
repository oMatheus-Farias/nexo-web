import { Service } from './Services';

export class GitHubService extends Service {
  static async getGitHubRepositories(): Promise<GitHubService.GetGitHubRepositoriesResponse> {
    const { data } =
      await this.client.get<GitHubService.GetGitHubRepositoriesResponse>('/github/repositories');

    return data;
  }
}

export namespace GitHubService {
  export type GetGitHubRepositoriesResponse = {
    repositories: Array<{
      id: number;
      name: string;
      full_name: string;
      private: boolean;
      owner: {
        login: string;
        id: number;
        avatar_url: string;
        url: string;
      };
      description: string | null;
      language: string | null;
      updated_at: string;
    }>;
  };
}
