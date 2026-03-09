import GlobalSuspense from '@/view/components/GlobalSuspense';

import { useGitHubCallbackContainer } from './useGitHubCallback';

export default function GitHubCallbackPage() {
  useGitHubCallbackContainer();

  return <GlobalSuspense />;
}
