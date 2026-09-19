import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type { TrackedRepository } from './types';
import { loadTrackedRepositories } from './trackedRepositoriesStorage';

const trackedReposAdapter = createEntityAdapter<TrackedRepository>();

const initialState = trackedReposAdapter.setAll(
  trackedReposAdapter.getInitialState(),
  loadTrackedRepositories(),
);

const trackedReposSlice = createSlice({
  name: 'trackedRepos',
  initialState,
  reducers: {
    trackRepository: trackedReposAdapter.addOne,
    unTrackRepository: trackedReposAdapter.removeOne,
  },
});

export const { trackRepository, unTrackRepository } = trackedReposSlice.actions;
export const trackedReposReducer = trackedReposSlice.reducer;
export const trackedReposSelectors =
  trackedReposAdapter.getSelectors<RootState>((state) => state.trackedRepos);
