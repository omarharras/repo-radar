import type { Repository } from '../../shared/types/repository';
import type { GitHubRepository } from './githubTypes';

export function mapGitHubRepository(repository: GitHubRepository): Repository {
  return {
    id: repository.id,
    name: repository.name,
    fullName: repository.full_name,
    description: repository.description,
    url: repository.html_url,
    stars: repository.stargazers_count,
    openIssues: repository.open_issues_count,
  };
}
