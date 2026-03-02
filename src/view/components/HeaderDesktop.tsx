import nexoLogo from '@/view/assets/nexo-logo.svg';

export function HeaderDesktop() {
  return (
    <header className="container mx-auto hidden h-17.75 w-full items-center gap-2 bg-[#131313] px-6 text-sm lg:flex">
      <img src={nexoLogo} alt="Nexo Logo" className="h-8 w-auto" />
    </header>
  );
}
