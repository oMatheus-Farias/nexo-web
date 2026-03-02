import { GitMerge, Home, Settings } from 'lucide-react';

import { ROUTE_PATHS } from './routePaths';

export const NAVIGATION_LINKS = [
  {
    to: ROUTE_PATHS.userHome,
    icon: <Home className="w-4" strokeWidth={2.2} />,
    label: 'Home',
  },
  {
    to: ROUTE_PATHS.userRepositories,
    icon: <GitMerge className="w-4" strokeWidth={2.2} />,
    label: 'Repositórios',
  },
  {
    to: ROUTE_PATHS.userConfiguration,
    icon: <Settings className="w-4" strokeWidth={2.2} />,
    label: 'Configurações',
  },
];
