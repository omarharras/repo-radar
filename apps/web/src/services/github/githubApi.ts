import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Repository } from '../../shared/types/repository';
import type { GitHubSearchRepositoriesResponse } from './githubTypes';
import { mapGitHubRepository } from './githubMappers';

type RepositorySearchPage = {
  items: Repository[];
  totalCount: number;
};

export const githubApi = createApi({
  reducerPath: 'githubApi',

  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),

  endpoints: (builder) => ({
    searchRepositories: builder.infiniteQuery<
      RepositorySearchPage,
      string,
      number
    >({
      infiniteQueryOptions: {
        initialPageParam: 1,
        getNextPageParam(lastPage, allPages, lastPageParam) {
          const loadedItemsCount = allPages.reduce(
            (total, page) => total + page.items.length,
            0,
          );
          if (loadedItemsCount >= lastPage.totalCount) {
            return undefined;
          }
          return lastPageParam + 1;
        },
      },

      query: ({ queryArg, pageParam }) => ({
        url: `search/repositories`,
        params: {
          q: queryArg,
          page: pageParam,
          per_page: 10,
        },
      }),

      transformResponse: (
        response: GitHubSearchRepositoriesResponse,
      ): RepositorySearchPage => ({
        items: response.items.map(mapGitHubRepository),
        totalCount: response.total_count,
      }),
    }),
  }),
});

export const { useSearchRepositoriesInfiniteQuery } = githubApi;
