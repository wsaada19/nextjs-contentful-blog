import nba from 'nba-api-client';
import { teams } from './nbaTeamEfficiency';

export async function getAdvancedTeamData() {
  console.log('Getting team data!');
  const stats = await nba.leagueTeamGeneralStats({
    MeasureType: 'Advanced',
    Season: '2022-23',
  });
  console.log('Team data received!');
  return teams.map((team, i) => {
    const teamAdvStats = stats.LeagueDashTeamStats[i];
    team.offRating = teamAdvStats.OFF_RATING;
    team.defRating = teamAdvStats.DEF_RATING;
    return { ...team, wins: teamAdvStats.W };
  });
}
