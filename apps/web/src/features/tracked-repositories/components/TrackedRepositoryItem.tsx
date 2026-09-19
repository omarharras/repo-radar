import {
  Alert,
  Chip,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  Skeleton,
} from '@mui/material';

import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import CloseIcon from '@mui/icons-material/Close';
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
  const dispatch = useAppDispatch();

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

  const handleUntrack = () => {
    dispatch(unTrackRepository(repository.id));
  };

  if (isRepositoryLoading) {
    return (
      <Paper
        variant='outlined'
        sx={{
          p: 2.5,
          borderRadius: 3,
        }}
      >
        <Stack spacing={1.5}>
          <Skeleton variant='text' width='30%' height={32} />
          <Skeleton variant='text' width='55%' />
          <Stack direction='row' spacing={1}>
            <Skeleton variant='rounded' width={110} height={24} />
            <Skeleton variant='rounded' width={130} height={24} />
            <Skeleton variant='rounded' width={220} height={24} />
          </Stack>
        </Stack>
      </Paper>
    );
  }

  if (isRepositoryError && !repositoryData) {
    return (
      <Paper
        variant='outlined'
        sx={{
          p: 2.5,
          borderRadius: 3,
        }}
      >
        <Alert severity='error'>Failed to load {repository.fullName}.</Alert>
      </Paper>
    );
  }

  if (!repositoryData) {
    return null;
  }

  return (
    <Paper
      variant='outlined'
      sx={{
        p: 2.5,
        borderRadius: 3,
      }}
    >
      <Stack spacing={2}>
        <Stack
          direction='row'
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Stack spacing={0.5}>
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              {repositoryData.fullName}
            </Typography>

            {repositoryData.description && (
              <Typography variant='body2' color='text.secondary'>
                {repositoryData.description}
              </Typography>
            )}
          </Stack>

          <Stack direction='row' spacing={0.5}>
            <Tooltip title={isRefreshing ? 'Refreshing...' : 'Refresh'}>
              <span>
                <IconButton
                  size='small'
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  aria-label='Refresh repository'
                >
                  {isRefreshing ? (
                    <CircularProgress size={18} />
                  ) : (
                    <RefreshOutlinedIcon fontSize='small' />
                  )}
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title='Untrack repository'>
              <IconButton
                size='small'
                color='error'
                onClick={handleUntrack}
                aria-label='Untrack repository'
              >
                <CloseIcon fontSize='small' />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Stack
          direction='row'
          spacing={1}
          sx={{
            flexWrap: 'wrap',
            rowGap: 1,
          }}
        >
          <Chip
            size='small'
            label={`Stars ${repositoryData.stars.toLocaleString()}`}
          />

          <Chip
            size='small'
            label={`Open issues ${repositoryData.openIssues.toLocaleString()}`}
          />

          {isLatestCommitLoading ? (
            <Skeleton variant='rounded' width={220} height={24} />
          ) : latestCommitDate ? (
            <Chip
              size='small'
              variant='outlined'
              label={`Latest commit ${new Date(latestCommitDate).toLocaleString()}`}
            />
          ) : null}
        </Stack>

        {isLatestCommitError && !latestCommitDate && (
          <Alert severity='error'>Failed to load latest commit.</Alert>
        )}

        {((isLatestCommitError && latestCommitDate) || isRepositoryError) && (
          <Alert
            severity='warning'
            variant='outlined'
            sx={{
              py: 0,
              px: 1.25,
              '& .MuiAlert-icon': {
                py: 0.75,
              },
              '& .MuiAlert-message': {
                py: 0.75,
              },
            }}
          >
            Some data could not be refreshed. Showing the last available values.
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
