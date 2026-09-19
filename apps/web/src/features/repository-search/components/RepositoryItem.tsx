import { Box, Button, Chip, Link, Stack, Typography } from '@mui/material';

import type { Repository } from '../../../shared/types/repository';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  trackedReposSelectors,
  trackRepository,
  unTrackRepository,
} from '../../tracked-repositories/trackedRepositoriesSlice';

type RepositoryItemProps = {
  repository: Repository;
};

export function RepositoryItem({ repository }: RepositoryItemProps) {
  const dispatch = useAppDispatch();

  const trackedRepository = useAppSelector((state) =>
    trackedReposSelectors.selectById(state, repository.id),
  );
  const isTracked = Boolean(trackedRepository);

  const handleTrackToggle = () => {
    if (isTracked) {
      dispatch(unTrackRepository(repository.id));
      return;
    }

    dispatch(
      trackRepository({
        id: repository.id,
        fullName: repository.fullName,
      }),
    );
  };

  return (
    <Box
      sx={{
        py: 2,
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Stack
        direction='row'
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Stack spacing={1}>
          <Link
            href={repository.url}
            target='_blank'
            rel='noopener noreferrer'
            underline='hover'
            variant='h6'
          >
            {repository.fullName}
          </Link>

          {repository.description && (
            <Typography color='text.secondary'>
              {repository.description}
            </Typography>
          )}

          <Stack direction='row' spacing={1}>
            <Chip
              size='small'
              label={`★ ${repository.stars.toLocaleString()}`}
            />

            <Chip
              size='small'
              label={`Issues ${repository.openIssues.toLocaleString()}`}
            />
          </Stack>
        </Stack>

        <Button
          variant={isTracked ? 'outlined' : 'contained'}
          onClick={handleTrackToggle}
        >
          {isTracked ? 'Untrack' : 'Track'}
        </Button>
      </Stack>
    </Box>
  );
}
