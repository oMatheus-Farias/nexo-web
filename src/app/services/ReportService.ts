import { Service } from './Services';

export class ReportService extends Service {
  static async generateGithubRepositoryReport(
    payload: ReportService.GenerateGithubRepositoryReportPayload,
  ): Promise<ReportService.GenerateGithubRepositoryReportResponse> {
    const { data } =
      await ReportService.client.post<ReportService.GenerateGithubRepositoryReportResponse>(
        '/reports/github/generate',
        payload,
      );

    return data;
  }
}

export namespace ReportService {
  export type ReportStyle = 'EXECUTIVE' | 'TECHNICAL' | 'SPRINT' | 'WEEKLY';

  export type GenerateGithubRepositoryReportPayload = {
    report_style?: ReportStyle;
    repository_external_id?: number;
    repository_full_name?: string;
    period_start: string;
    period_end: string;
    max_items_per_type?: number;
  };

  export type GenerateGithubRepositoryReportResponse = {
    report_id: string;
    created_at: string;
    repository: {
      id: string;
      name: string;
      full_name: string;
      is_private: boolean;
      html_url: string;
    };
    period: {
      start: string;
      end: string;
    };
    report_style: ReportStyle;
    summary_text: string;
    metrics: {
      total_commits: number;
      total_pull_requests: number;
      merged_pull_requests: number;
      open_pull_requests: number;
      total_issues: number;
      closed_issues: number;
      top_contributors: Array<{
        login: string;
        commits: number;
      }>;
    };
    usage: {
      model: string;
      total_tokens: number;
    };
  };
}
