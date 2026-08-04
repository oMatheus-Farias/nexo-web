import { Service } from './Services';

export class GitHubService extends Service {
  static async getGitHubRepositories(
    payload?: GitHubService.GetGitHubRepositoriesPayload,
  ): Promise<GitHubService.GetGitHubRepositoriesResponse> {
    const { data } = await this.client.get<GitHubService.GetGitHubRepositoriesResponse>(
      '/github/repositories',
      { params: payload },
    );

    return data;
  }
}

export namespace GitHubService {
  export type GetGitHubRepositoriesResponse = {
    repositories: Array<{
      id: string;
      name: string;
      full_name: string;
      owner: string;
      isPrivate: boolean;
      htmlUrl: string;
    }>;
  };

  export type GetGitHubRepositoriesPayload = {
    searchTerm?: string;
  };
}
