import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Repository } from '../../shared/types/repository';
import type {
  GitHubSearchRepositoriesResponse,
  GitHubRepository,
  GitHubCommit,
} from './githubTypes';
import { mapGitHubRepository } from './githubMappers';

type RepositorySearchPage = {
  items: Repository[];
  totalCount: number;
};

const GITHUB_SEARCH_RESULTS_LIMIT = 1000;
const SEARCH_REPOSITORIES_PER_PAGE = 10;

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
          const searchableItemsCount = Math.min(
            lastPage.totalCount,
            GITHUB_SEARCH_RESULTS_LIMIT,
          );
          const loadedItemsCount = allPages.reduce(
            (total, page) => total + page.items.length,
            0,
          );
          if (loadedItemsCount >= searchableItemsCount) {
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
          per_page: SEARCH_REPOSITORIES_PER_PAGE,
        },
      }),

      transformResponse: (
        response: GitHubSearchRepositoriesResponse,
      ): RepositorySearchPage => ({
        items: response.items.map(mapGitHubRepository),
        totalCount: response.total_count,
      }),
    }),

    getRepository: builder.query<Repository, string>({
      query: (fullName) => ({
        url: `repos/${fullName}`,
      }),

      transformResponse: (response: GitHubRepository) =>
        mapGitHubRepository(response),
    }),

    getLatestCommit: builder.query<string | null, number>({
      query: (repositoryId) => ({
        url: `repositories/${repositoryId}/commits`,
        params: {
          per_page: 1,
        },
      }),

      transformResponse: (response: GitHubCommit[]) =>
        response[0]?.commit.committer.date ?? null,
    }),
  }),
});

export const {
  useSearchRepositoriesInfiniteQuery,
  useGetRepositoryQuery,
  useGetLatestCommitQuery,
} = githubApi;
