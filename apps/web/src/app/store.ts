import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from '../services/github/githubApi';
import { trackedReposReducer } from '../features/tracked-repositories/trackedRepositoriesSlice';
import { trackedRepositoriesListener } from '../features/tracked-repositories/trackedRepositoriesListener';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    trackedRepos: trackedReposReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(trackedRepositoriesListener.middleware)
      .concat(githubApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
