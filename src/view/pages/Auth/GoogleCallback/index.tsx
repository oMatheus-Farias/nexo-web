import GlobalSuspense from '@/view/components/GlobalSuspense';

import { useGoogleCallbackContainer } from './useGoogleCallback';

export default function GoogleCallbackPage() {
  useGoogleCallbackContainer();

  return <GlobalSuspense />;
}
