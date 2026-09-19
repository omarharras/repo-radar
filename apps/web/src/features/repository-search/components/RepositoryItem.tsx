import { Box, Chip, Link, Stack, Typography } from '@mui/material';

import type { Repository } from '../../../shared/types/repository';

type RepositoryItemProps = {
  repository: Repository;
};

export function RepositoryItem({ repository }: RepositoryItemProps) {
  return (
    <Box
      sx={{
        py: 2,
        borderBottom: 1,
        borderColor: 'divider',
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
          <Chip size='small' label={`★ ${repository.stars.toLocaleString()}`} />

          <Chip
            size='small'
            label={`Issues ${repository.openIssues.toLocaleString()}`}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
