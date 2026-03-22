import nexoLogo from '@/app/assets/nexo-logo.svg';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container mx-auto flex h-17.75 w-full items-center justify-between gap-2 bg-[#131313] px-6 text-center text-[12px] text-gray-400 lg:text-sm">
      <img src={nexoLogo} alt="Nexo Logo" className="h-8 w-auto" />
      <p>&copy; {currentYear} Nexo. Todos os direitos reservados</p>
    </footer>
  );
}
