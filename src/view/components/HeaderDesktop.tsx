import { Flame } from 'lucide-react';

import gitHubIcon from '@/app/assets/github-icon.svg';
import nexoLogo from '@/app/assets/nexo-logo.svg';

export function HeaderDesktop() {
  return (
    <header className="container mx-auto hidden h-17.75 w-full items-center justify-between gap-2 bg-[#131313] px-6 text-sm lg:flex">
      <img src={nexoLogo} alt="Nexo Logo" className="h-8 w-auto" />

      <div className="flex items-center gap-4">
        <p className="text-[#C6C6C6]">Dashboard</p>

        <button
          type="button"
          aria-label="Connect GitHub"
          className="flex cursor-pointer items-center gap-1 rounded-xl border border-[#3A3A3A] bg-[#1D1D1D] px-5 py-2.5 font-medium text-[#C6C6C6] transition-colors duration-200 ease-in-out hover:bg-[#282828]"
        >
          <img src={gitHubIcon} alt="GitHub Icon" className="h-4 w-auto" />
          Conectar GitHub
        </button>

        <button
          type="button"
          aria-label="Upgrade to PRO"
          className="flex cursor-pointer items-center gap-1 rounded-xl bg-linear-to-r from-[#00437F] via-[#81B7E8] via-80% to-[#788DE2] px-5 py-2.5 font-medium text-white transition-all duration-200 ease-in-out hover:bg-linear-to-r hover:shadow-2xl hover:shadow-[#4f5a85]"
        >
          <Flame size={16} color="white" />
          Upgrade PRO
        </button>
      </div>
    </header>
  );
}
