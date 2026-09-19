import { Paper, Skeleton, Stack } from '@mui/material';

export function RepositoriesListSkeleton() {
  return (
    <Stack spacing={2}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Paper
          key={index}
          variant='outlined'
          sx={{
            p: 2.5,
            borderRadius: 3,
          }}
        >
          <Stack spacing={1.5}>
            <Skeleton variant='text' width='35%' height={32} />
            <Skeleton variant='text' width='70%' />

            <Stack direction='row' spacing={1}>
              <Skeleton variant='rounded' width={110} height={24} />
              <Skeleton variant='rounded' width={130} height={24} />
            </Stack>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}
