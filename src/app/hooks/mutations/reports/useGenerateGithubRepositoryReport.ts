import { useMutation } from '@tanstack/react-query';

import { ReportService } from '@/app/services/ReportService';

export function useGenerateGithubRepositoryReport() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ReportService.generateGithubRepositoryReport,
  });

  return {
    generateGithubRepositoryReportFn: mutateAsync,
    isGenerateGithubRepositoryReportPending: isPending,
  };
}
