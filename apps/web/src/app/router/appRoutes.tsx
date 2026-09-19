import SearchIcon from '@mui/icons-material/Search';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';

import { RepositorySearch } from '../../features/repository-search/RepositorySearch';
import { TrackedRepositories } from '../../features/tracked-repositories/TrackedRepositories';

export const appRoutes = [
  {
    path: '/search',
    element: <RepositorySearch />,
    handle: {
      nav: {
        label: 'Search Repository',
        icon: <SearchIcon />,
      },
    },
  },
  {
    path: '/tracked',
    element: <TrackedRepositories />,
    handle: {
      nav: {
        label: 'Tracked Repositories',
        icon: <BookmarksOutlinedIcon />,
      },
    },
  },
];
