import { Service } from './Services';

export class GitHubService extends Service {
  static async getGitHubRepositories(
    payload: GitHubService.GetGitHubRepositoriesPayload,
  ): Promise<GitHubService.GetGitHubRepositoriesResponse> {
    const { data } = await this.client.get<GitHubService.GetGitHubRepositoriesResponse>(
      '/repositories/paginated',
      { params: payload },
    );

    return data;
  }
}

export namespace GitHubService {
  export type GetGitHubRepositoriesPayload = {
    page: number;
    limitPerPage?: number;
    searchTerm?: string;
  };

  export type GetGitHubRepositoriesResponse = {
    repositories: Array<{
      id: string;
      external_repo_id: string;
      name: string;
      full_name: string;
      is_private: boolean;
      created_at: string;
    }>;
    meta: {
      page_index: number;
      limit_per_page: number;
      count_per_page: number;
      total_count: number;
    };
  };
}
