import { Service } from './Services';

export class GitHubService extends Service {
  static async getGitHubRepositories(): Promise<GitHubService.GetGitHubRepositoriesResponse> {
    const { data } =
      await this.client.get<GitHubService.GetGitHubRepositoriesResponse>('/repositories/paginated');

    return data;
  }
}

export namespace GitHubService {
  export type GetGitHubRepositoriesResponse = {
    repositories: Array<{
      id: string;
      name: string;
      full_name: string;
      is_private: boolean;
      created_at: string;
    }>;
  };
}
