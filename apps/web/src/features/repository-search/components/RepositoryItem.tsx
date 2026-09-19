import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import {
  Chip,
  Link,
  Stack,
  Typography,
  IconButton,
  Paper,
  Tooltip,
} from '@mui/material';

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
    <Paper
      sx={{
        p: 2.5,
        borderRadius: 3,
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
            sx={{ fontWeight: 600 }}
          >
            {repository.fullName}
          </Link>

          {repository.description && (
            <Typography variant='body2' color='text.secondary'>
              {repository.description}
            </Typography>
          )}

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
              label={`Stars ${repository.stars.toLocaleString()}`}
            />

            <Chip
              size='small'
              label={`Open issues ${repository.openIssues.toLocaleString()}`}
            />
          </Stack>
        </Stack>

        <Tooltip title={isTracked ? 'Untrack repository' : 'Track repository'}>
          <IconButton
            size='small'
            onClick={handleTrackToggle}
            aria-label={isTracked ? 'Untrack repository' : 'Track repository'}
            sx={{
              border: 1,
              borderColor: isTracked ? 'error.main' : 'primary.main',
              color: isTracked ? 'error.main' : 'primary.main',
            }}
          >
            {isTracked ? (
              <CloseIcon fontSize='small' />
            ) : (
              <AddIcon fontSize='small' />
            )}
          </IconButton>
        </Tooltip>
      </Stack>
    </Paper>
  );
}
