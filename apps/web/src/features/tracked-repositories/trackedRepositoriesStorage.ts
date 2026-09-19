import type { TrackedRepository } from './types';

export function loadTrackedRepositories(): TrackedRepository[] {
  const storedRepos = localStorage.getItem('tracked-repositories');

  if (!storedRepos) {
    return [];
  }

  try {
    return JSON.parse(storedRepos) as TrackedRepository[];
  } catch {
    return [];
  }
}

export function saveTrackedRepositories(repositories: TrackedRepository[]) {
  localStorage.setItem('tracked-repositories', JSON.stringify(repositories));
}
