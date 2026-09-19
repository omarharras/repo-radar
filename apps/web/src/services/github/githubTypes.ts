export type GitHubRepository = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  open_issues_count: number;
};

export type GitHubSearchRepositoriesResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepository[];
};

export type GitHubCommit = {
  commit: {
    committer: {
      date: string;
    };
  };
};
