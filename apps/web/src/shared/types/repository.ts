export type Repository = {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  url: string;
  stars: number;
  openIssues: number;
};
