import { Flame } from 'lucide-react';

import gitHubIcon from '@/app/assets/github-icon.svg';
import nexoLogo from '@/app/assets/nexo-logo.svg';
import { useAuth } from '@/app/contexts/auth/useAuth';

export function HeaderDesktop() {
  const { me } = useAuth();

  const appName = 'app-nexo-AI';

  function handleConnectGitHubApps() {
    window.location.href = `https://github.com/apps/${appName}/installations/new`;
  }

  return (
    <header className="bg-background sticky top-0 z-50 container mx-auto hidden max-h-17.75 min-h-17.75 items-center justify-between gap-2 px-6 text-center text-sm backdrop-blur-xs lg:flex">
      <img src={nexoLogo} alt="Nexo Logo" className="h-8 w-auto" />

      <div className="flex items-center gap-4">
        <p className="text-[#C6C6C6]">Dashboard</p>

        {!me?.is_github_app_installed && (
          <button
            type="button"
            aria-label="Connect GitHub"
            onClick={handleConnectGitHubApps}
            className="flex cursor-pointer items-center gap-1 rounded-[10px] border border-[#3A3A3A] bg-[#1D1D1D] px-5 py-2.5 font-medium text-[#C6C6C6] transition-colors duration-200 ease-in-out hover:bg-[#282828]"
          >
            <img src={gitHubIcon} alt="GitHub Icon" className="h-4 w-auto" />
            Conectar GitHub
          </button>
        )}

        {me?.is_github_app_installed && (
          <button
            type="button"
            aria-label="GitHub Connected"
            disabled
            className="flex cursor-pointer items-center gap-1 rounded-[10px] border border-[#3A3A3A] bg-[#1D1D1D] px-5 py-2.5 font-medium text-[#C6C6C6] transition-colors duration-200 ease-in-out hover:bg-[#282828]"
          >
            <img src={gitHubIcon} alt="GitHub Icon" className="h-4 w-auto" />
            GitHub conectado
            <div className="ml-1 max-h-2.5 min-h-2.5 max-w-2.5 min-w-2.5 animate-pulse rounded-full bg-[#50C878] blur-[1.6px]"></div>
          </button>
        )}

        <button
          type="button"
          aria-label="Upgrade to PRO"
          className="flex cursor-pointer items-center gap-1 rounded-[10px] bg-linear-to-r from-[#00437F] via-[#81B7E8] via-80% to-[#788DE2] px-5 py-2.5 font-medium text-white transition-all duration-200 ease-in-out hover:bg-linear-to-r hover:shadow-2xl hover:shadow-[#4f5a85]"
        >
          <Flame size={16} color="white" />
          Upgrade PRO
        </button>
      </div>
    </header>
  );
}
