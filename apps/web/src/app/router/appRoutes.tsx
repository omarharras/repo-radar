import SearchIcon from '@mui/icons-material/Search';

import { RepositorySearch } from '../../features/repository-search/RepositorySearch';

export const appRoutes = [
  {
    path: '/search',
    element: <RepositorySearch />,
    handle: {
      nav: {
        label: 'Search',
        icon: <SearchIcon />,
      },
    },
  },
];