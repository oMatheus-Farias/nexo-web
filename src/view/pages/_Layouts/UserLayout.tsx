import { Outlet } from 'react-router-dom';

import { Footer } from '@/view/components/Footer';
import { HeaderDesktop } from '@/view/components/HeaderDesktop';
import { SidebarMenu } from '@/view/components/SidebarMenu';

export default function UserLayout() {
  return (
    <div className="flex h-screen w-full flex-col">
      <SidebarMenu />

      <div className="flex h-full flex-col lg:ml-56">
        <HeaderDesktop />

        <main className="container mx-auto flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
