import type { TrackedRepository } from './types';

function isTrackedRepository(value: unknown): value is TrackedRepository {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const repository = value as Partial<TrackedRepository>;

  return (
    typeof repository.id === 'number' &&
    typeof repository.fullName === 'string' &&
    repository.fullName.trim().length > 0
  );
}

export function loadTrackedRepositories(): TrackedRepository[] {
  const storedRepos = localStorage.getItem('tracked-repositories');

  if (!storedRepos) {
    return [];
  }

  try {
    const parsedRepos: unknown = JSON.parse(storedRepos);

    if (!Array.isArray(parsedRepos)) {
      return [];
    }

    if (!parsedRepos.every(isTrackedRepository)) {
      return [];
    }

    return parsedRepos;
  } catch {
    return [];
  }
}

export function saveTrackedRepositories(repositories: TrackedRepository[]) {
  localStorage.setItem('tracked-repositories', JSON.stringify(repositories));
}
