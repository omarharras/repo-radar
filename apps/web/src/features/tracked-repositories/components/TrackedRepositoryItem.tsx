import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';

import {
  useGetLatestCommitQuery,
  useGetRepositoryQuery,
} from '../../../services/github/githubApi';
import type { TrackedRepository } from '../types';

import { useAppDispatch } from '../../../app/hooks';
import { unTrackRepository } from '../trackedRepositoriesSlice';

type TrackedRepositoryItemProps = {
  repository: TrackedRepository;
};

export function TrackedRepositoryItem({
  repository,
}: TrackedRepositoryItemProps) {
  const {
    data: repositoryData,
    isLoading: isRepositoryLoading,
    isError: isRepositoryError,
    refetch: refetchRepository,
    isFetching: isRepositoryFetching,
  } = useGetRepositoryQuery(repository.fullName);

  const {
    data: latestCommitDate,
    isLoading: isLatestCommitLoading,
    isError: isLatestCommitError,
    refetch: refetchLatestCommit,
    isFetching: isLatestCommitFetching,
  } = useGetLatestCommitQuery(repository.id);

  const isRefreshing = isRepositoryFetching || isLatestCommitFetching;

  const handleRefresh = () => {
    refetchRepository();
    refetchLatestCommit();
  };

  const dispatch = useAppDispatch();

  const handleUntrack = () => {
    dispatch(unTrackRepository(repository.id));
  };

  if (isRepositoryLoading) {
    return (
      <Box sx={{ py: 2 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (isRepositoryError && !repositoryData) {
    return (
      <Alert severity='error'>Failed to load {repository.fullName}.</Alert>
    );
  }

  if (!repositoryData) {
    return null;
  }

  console.log({
    isRepositoryError,
    isLatestCommitError,
    latestCommitDate,
    isRepositoryFetching,
    isLatestCommitFetching,
  });

  return (
    <Stack spacing={1}>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h6'>{repositoryData.fullName}</Typography>

        <Stack direction='row' spacing={1}>
          <Button
            variant='outlined'
            size='small'
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>

          <Button color='error' size='small' onClick={handleUntrack}>
            Untrack
          </Button>
        </Stack>
      </Stack>

      {repositoryData.description && (
        <Typography color='text.secondary'>
          {repositoryData.description}
        </Typography>
      )}

      <Typography>Stars: {repositoryData.stars.toLocaleString()}</Typography>

      <Typography>
        Open issues: {repositoryData.openIssues.toLocaleString()}
      </Typography>

      {isLatestCommitLoading && (
        <Typography color='text.secondary'>Loading latest commit...</Typography>
      )}

      {isLatestCommitError && !latestCommitDate && (
        <Typography color='error'>Failed to load latest commit.</Typography>
      )}

      {isLatestCommitError && latestCommitDate && (
        <Typography color='warning.main'>
          Failed to refresh latest commit. Showing the last available value.
        </Typography>
      )}

      {latestCommitDate && (
        <Typography>
          Latest commit: {new Date(latestCommitDate).toLocaleString()}
        </Typography>
      )}

      {isRepositoryError && (
        <Alert severity='warning'>
          Failed to refresh repository data. Showing the last available data.
        </Alert>
      )}
    </Stack>
  );
}
