import { useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

import { useSearchRepositoriesInfiniteQuery } from '../../services/github/githubApi';
import { useDebouncedValue } from './hooks/useDebouncedValue';
import { SearchField } from '@repo-radar/ui';
import { RepositoriesList } from './components/RepositoriesList';
import { RepositoriesListSkeleton } from './components/RepositoriesListSkeleton';
import { Alert, Typography, Button, Box, Stack, Paper } from '@mui/material';
import { CircularProgress } from '@mui/material';

export function RepositorySearch() {
  const [searchValue, setSearchValue] = useState('');

  const debouncedSearchValue = useDebouncedValue(searchValue.trim(), 1000);
  const hasSearchValue = Boolean(debouncedSearchValue);

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchRepositoriesInfiniteQuery(debouncedSearchValue || skipToken);

  const repositories = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <Stack spacing={3}>
      <Stack spacing={0.75}>
        <Typography variant='h4' sx={{ fontWeight: 700 }}>
          Repository Search
        </Typography>

        <Typography color='text.secondary'>
          Search GitHub repositories and track the ones you care about.
        </Typography>
      </Stack>
      <Box sx={{ maxWidth: 760 }}>
        <SearchField
          fullWidth
          size='small'
          value={searchValue}
          onChange={setSearchValue}
          label='Search repositories'
          placeholder='e.g. react, vite, redux'
        />
      </Box>
      {!hasSearchValue && (
        <Paper
          variant='outlined'
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: 'center',
          }}
        >
          <Stack spacing={1}>
            <Typography variant='h6'>Search GitHub repositories</Typography>

            <Typography color='text.secondary'>
              Start typing a repository name or keyword to see results.
            </Typography>
          </Stack>
        </Paper>
      )}
      {isLoading && hasSearchValue && <RepositoriesListSkeleton />}

      {isError && hasSearchValue && (
        <Alert severity='error'>Failed to load repositories.</Alert>
      )}

      {hasSearchValue &&
        !isLoading &&
        !isError &&
        repositories.length === 0 && (
          <Typography color='text.secondary'>No repositories found.</Typography>
        )}

      {!isLoading && !isError && repositories.length > 0 && hasSearchValue && (
        <Stack spacing={2}>
          <RepositoriesList repositories={repositories} />

          {hasNextPage && (
            <Stack
              sx={{
                alignItems: 'center',
              }}
            >
              <Button
                variant='outlined'
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                startIcon={
                  isFetchingNextPage ? (
                    <CircularProgress size={16} />
                  ) : undefined
                }
              >
                Load more
              </Button>
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
}
