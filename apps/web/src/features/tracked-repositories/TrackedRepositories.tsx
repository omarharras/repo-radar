import { Button, Stack, Typography, Paper } from '@mui/material';

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
    <Stack spacing={4}>
      <Stack
        direction='row'
        sx={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
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

      {trackedRepositories.length > 0 && (
        <Paper
          variant='outlined'
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <Stack spacing={2}>
            <Stack spacing={0.5}>
              <Typography variant='h6' sx={{ fontWeight: 600 }}>
                Stars by repository
              </Typography>

              <Typography variant='body2' color='text.secondary'>
                Compare GitHub stars across your tracked repositories.
              </Typography>
            </Stack>

            <TrackedRepositoriesChart />
          </Stack>
        </Paper>
      )}

      {trackedRepositories.length === 0 ? (
        <Paper
          variant='outlined'
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Stack spacing={1}>
            <Typography variant='h6'>No tracked repositories yet</Typography>

            <Typography color='text.secondary'>
              Track repositories from the search page to monitor them here.
            </Typography>
          </Stack>
        </Paper>
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
