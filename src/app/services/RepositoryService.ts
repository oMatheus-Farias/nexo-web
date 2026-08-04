import { Service } from './Services';

export class RepositoryService extends Service {
  static async getRepositories(
    payload: RepositoryService.GetRepositoriesPayload,
  ): Promise<RepositoryService.GetRepositoriesResponse> {
    const { data } = await this.client.get<RepositoryService.GetRepositoriesResponse>(
      '/repositories/paginated',
      { params: payload },
    );

    return data;
  }

  static async discoverRepositories(): Promise<RepositoryService.DiscoverRepositoriesResponse> {
    const { data } =
      await this.client.get<RepositoryService.DiscoverRepositoriesResponse>(
        '/repositories/discover',
      );

    return data;
  }

  static async addRepositories(
    payload: RepositoryService.AddRepositoriesPayload,
  ): Promise<RepositoryService.AddRepositoriesResponse> {
    const { data } = await RepositoryService.client.post<RepositoryService.AddRepositoriesResponse>(
      '/repositories/add',
      payload,
    );

    return data;
  }

  static async syncRepositories(): Promise<RepositoryService.SyncRepositoriesResponse> {
    const { data } =
      await RepositoryService.client.post<RepositoryService.SyncRepositoriesResponse>(
        '/repositories/sync',
      );

    return data;
  }

  static async syncRepository(
    repositoryId: string,
  ): Promise<RepositoryService.SyncRepositoriesResponse> {
    const { data } =
      await RepositoryService.client.post<RepositoryService.SyncRepositoriesResponse>(
        `/repositories/${repositoryId}/sync`,
      );

    return data;
  }

  static async updateRepository(
    repositoryId: string,
    payload: RepositoryService.UpdateRepositoryPayload,
  ): Promise<RepositoryService.UpdateRepositoryResponse> {
    const { data } =
      await RepositoryService.client.patch<RepositoryService.UpdateRepositoryResponse>(
        `/repositories/${repositoryId}`,
        payload,
      );

    return data;
  }
}

export namespace RepositoryService {
  export type RepositoryStatus = 'SYNCED' | 'PENDING' | 'DISCONNECTED' | 'PAUSED' | 'ERROR';

  export type RepositoryItem = {
    id: string;
    name: string;
    full_name: string;
    is_private: boolean;
    created_at: string;
    sync_status: RepositoryStatus;
    is_enabled: boolean;
    last_synced_at: string | null;
    last_sync_attempt_at: string | null;
    last_sync_error: string | null;
    disconnected_at: string | null;
  };

  export type GetRepositoriesPayload = {
    page: number;
    limitPerPage?: number;
    searchTerm?: string;
  };

  export type GetRepositoriesResponse = {
    repositories: RepositoryItem[];
    meta: {
      page_index: number;
      limit_per_page: number;
      count_per_page: number;
      total_count: number;
    };
  };

  export type DiscoverRepositoryItem = {
    external_repo_id: string;
    name: string;
    full_name: string;
    owner: string;
    is_private: boolean;
    html_url: string;
    local_repository_id: string | null;
    sync_status: RepositoryStatus;
    is_enabled: boolean;
    last_synced_at: string | null;
    last_sync_attempt_at: string | null;
    last_sync_error: string | null;
    disconnected_at: string | null;
  };

  export type DiscoverRepositoriesResponse = {
    repositories: DiscoverRepositoryItem[];
  };

  export type AddRepositoriesPayload = {
    external_repo_ids: string[];
  };

  export type AddRepositoriesResponse = {
    repositories: Array<{
      id: string;
      name: string;
      fullName: string;
      owner: string;
      isPrivate: boolean;
      htmlUrl: string;
    }>;
  };

  export type SyncRepositoriesResponse = {
    repositories: Array<{
      id: string;
      name: string;
      fullName: string;
      owner: string;
      isPrivate: boolean;
      htmlUrl: string;
    }>;
  };

  export type UpdateRepositoryPayload = {
    is_enabled: boolean;
  };

  export type UpdateRepositoryResponse = {
    repository: {
      id: string;
      integrationId: string;
      externalRepoId: string;
      name: string;
      fullName: string;
      isPrivate: boolean;
      syncStatus: RepositoryStatus;
      isEnabled: boolean;
      lastSyncedAt: string | null;
      lastSyncAttemptAt: string | null;
      lastSyncError: string | null;
      disconnectedAt: string | null;
      createdAt: string;
    };
  };
}
