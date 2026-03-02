import { Link, type LinkProps, useLocation } from 'react-router-dom';

type NavLinkProps = LinkProps;

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation();

  const setCurrentData = () => {
    if (pathname === props.to) {
      return true;
    }
    return false;
  };

  return (
    <Link
      data-current={setCurrentData()}
      viewTransition={true}
      className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium tracking-tight text-gray-300/80 transition-all duration-100 ease-linear data-[current=false]:hover:bg-[#212121] data-[current=true]:bg-white data-[current=true]:text-[#0B1026] lg:text-base"
      {...props}
    />
  );
}
