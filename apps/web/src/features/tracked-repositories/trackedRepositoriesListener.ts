import { createListenerMiddleware } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import {
  trackedReposSelectors,
  trackRepository,
  unTrackRepository,
} from './trackedRepositoriesSlice';
import { saveTrackedRepositories } from './trackedRepositoriesStorage';

export const trackedRepositoriesListener = createListenerMiddleware();

trackedRepositoriesListener.startListening({
  matcher: (action) =>
    trackRepository.match(action) || unTrackRepository.match(action),

  effect: (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;

    const repositories = trackedReposSelectors.selectAll(state);

    saveTrackedRepositories(repositories);
  },
});
