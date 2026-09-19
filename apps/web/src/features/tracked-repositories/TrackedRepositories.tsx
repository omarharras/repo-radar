import { Button, Stack, Typography } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { trackedReposSelectors } from './trackedRepositoriesSlice';
import { TrackedRepositoryItem } from './components/TrackedRepositoryItem';
import { githubApi } from '../../services/github/githubApi';
import { useState } from 'react';
import { TrackedRepositoriesChart } from './components/TrackedRepositoriesChart';

export function TrackedRepositories() {
  const trackedRepositories = useAppSelector(trackedReposSelectors.selectAll);
  const dispatch = useAppDispatch();
  const [isRefreshingAll, setIsRefreshingAll] = useState(false);

  const handleRefreshAll = async () => {
    setIsRefreshingAll(true);

    try {
      const requests = trackedRepositories.flatMap((repository) => [
        dispatch(
          githubApi.endpoints.getRepository.initiate(repository.fullName, {
            subscribe: false,
            forceRefetch: true,
          }),
        ),
        dispatch(
          githubApi.endpoints.getLatestCommit.initiate(repository.id, {
            subscribe: false,
            forceRefetch: true,
          }),
        ),
      ]);

      await Promise.allSettled(requests);
    } finally {
      setIsRefreshingAll(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Stack
        direction='row'
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack spacing={0.75}>
          <Typography variant='h4' sx={{ fontWeight: 700 }}>
            Tracked Repositories
          </Typography>

          <Typography color='text.secondary'>
            Monitor the repositories you are tracking.
          </Typography>
        </Stack>

        <Button
          variant='contained'
          onClick={handleRefreshAll}
          disabled={isRefreshingAll || trackedRepositories.length === 0}
        >
          {isRefreshingAll ? 'Refreshing...' : 'Refresh All'}
        </Button>
      </Stack>
      <TrackedRepositoriesChart />
      {trackedRepositories.length === 0 ? (
        <Typography color='text.secondary'>
          You are not tracking any repositories yet.
        </Typography>
      ) : (
        <Stack spacing={2}>
          {trackedRepositories.map((repository) => (
            <TrackedRepositoryItem
              key={repository.id}
              repository={repository}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
