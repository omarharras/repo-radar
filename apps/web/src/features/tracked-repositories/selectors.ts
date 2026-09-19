import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import { githubApi } from '../../services/github/githubApi';
import { trackedReposSelectors } from './trackedRepositoriesSlice';

export const selectTrackedRepoStars = createSelector(
  [(state: RootState) => state, trackedReposSelectors.selectAll],
  (state, trackedRepositories) =>
    trackedRepositories.flatMap((repository) => {
      const repositoryQuery = githubApi.endpoints.getRepository.select(
        repository.fullName,
      )(state);

      if (!repositoryQuery.data) {
        return [];
      }

      return [
        {
          repository: repository.fullName,
          stars: repositoryQuery.data.stars,
        },
      ];
    }),
);
