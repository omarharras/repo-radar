import { Stack } from '@mui/material';

import type { Repository } from '../../../shared/types/repository';
import { RepositoryItem } from './RepositoryItem';

type RepositoriesListProps = {
  repositories: Repository[];
};

export function RepositoriesList({ repositories }: RepositoriesListProps) {
  return (
    <Stack>
      {repositories.map((repository) => (
        <RepositoryItem key={repository.id} repository={repository} />
      ))}
    </Stack>
  );
}
