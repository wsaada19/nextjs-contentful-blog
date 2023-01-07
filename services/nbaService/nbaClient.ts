import nba from 'nba-api-client';
import teams from './nbaTeamEfficiency.json';

export async function getAdvancedTeamData() {
  const stats = await nba.leagueTeamGeneralStats({
    MeasureType: 'Advanced',
    Season: '2022-23',
  });
  return teams.map((team, i) => {
    const teamAdvStats = stats.LeagueDashTeamStats[i];
    team.offRating = teamAdvStats.OFF_RATING;
    team.defRating = teamAdvStats.DEF_RATING;
    return { ...team, wins: teamAdvStats.W };
  });
}
