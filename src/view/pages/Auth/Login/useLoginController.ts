import { toast } from 'sonner';

import { useAuth } from '@/app/contexts/auth/useAuth';

export function useLoginController() {
  const {
    startLoginWithGoogle,
    isStartLoginWithGooglePending,
    startLoginWithGitHub,
    isStartLoginWithGitHubPending,
  } = useAuth();

  async function handleStartLoginWithGoogle() {
    try {
      await startLoginWithGoogle();
    } catch {
      toast.error(
        'Ocorreu um erro ao tentar fazer login com o Google. Por favor, tente novamente.',
      );
    }
  }

  async function handleStartLoginWithGitHub() {
    try {
      await startLoginWithGitHub();
    } catch {
      toast.error(
        'Ocorreu um erro ao tentar fazer login com o GitHub. Por favor, tente novamente.',
      );
    }
  }

  return {
    handleStartLoginWithGoogle,
    isStartLoginWithGooglePending,
    handleStartLoginWithGitHub,
    isStartLoginWithGitHubPending,
  };
}
