import { BarChart } from '@repo-radar/plots';

import { useAppSelector } from '../../../app/hooks';
import { selectTrackedRepoStars } from '../selectors';

export function TrackedRepositoriesChart() {
  const repositoryStars = useAppSelector(selectTrackedRepoStars);

  const chartData = repositoryStars.map((repository) => ({
    label: repository.repository,
    value: repository.stars,
  }));

  if (chartData.length === 0) {
    return null;
  }

  return <BarChart data={chartData} seriesLabel='Stars' />;
}
