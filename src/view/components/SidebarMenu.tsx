import { NAVIGATION_LINKS } from '@/app/constants/navigationLinks';

import { DropdownMenuSidebar } from './DropdownMenuSidebar';
import { NavLink } from './NaviLink';
import { Badge } from './ui/Badge';

export function SidebarMenu() {
  return (
    <aside className="fixed z-10 hidden h-full w-56 flex-col border-r border-[#2A2A2A] bg-[#131313] px-4 py-3 lg:flex">
      <div className="flex w-full justify-start border-b border-[#2A2A2A] pb-4">
        <DropdownMenuSidebar />
      </div>

      <div className="flex flex-1 flex-col">
        <nav className="mt-5 flex w-full flex-1 flex-col gap-2.5 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {NAVIGATION_LINKS.map((link) => (
            <NavLink to={link.to} key={link.to}>
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-[#2A2A2A] bg-[#1F1F1F] p-2.5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex w-2/3 flex-col gap-1">
            <p className="text-xs font-medium text-gray-300 uppercase">Free plan</p>
            <div className="h-1.5 w-full rounded-full bg-linear-to-r from-[#00437F] to-[#788DE2]"></div>
          </div>

          <div className="w-1/3">
            <Badge
              variant="outline"
              className="border-none bg-linear-to-r from-[#00437F] to-[#788DE2] text-[10px] text-[#EDEDED]"
            >
              Upgrade
            </Badge>
          </div>
        </div>

        <p className="text-xs text-[#EDEDED]">3/3 relatórios usados</p>
      </div>
    </aside>
  );
}
