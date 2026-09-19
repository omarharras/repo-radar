import { Skeleton, Stack } from '@mui/material';

export function RepositoriesListSkeleton() {
  return (
    <Stack spacing={2}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Stack key={index} spacing={1}>
          <Skeleton variant='text' width='35%' height={32} />
          <Skeleton variant='text' width='80%' />
          <Stack direction='row' spacing={1}>
            <Skeleton variant='rounded' width={90} height={28} />
            <Skeleton variant='rounded' width={110} height={28} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
