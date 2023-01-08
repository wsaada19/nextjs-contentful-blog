import Layout from '@components/layouts/PageLayout';
import { getAdvancedTeamData } from '@services/nbaService/nbaClient';
import { sortBy } from '@utilities';
import { addScatterPlot } from 'graphs/nbaScatterplot';
import { TeamLeaderBoard } from 'graphs/TeamLeaderboard';
import { GetStaticProps } from 'next';
import React, { useEffect, useRef } from 'react';
import { TeamData } from 'types/nbaTeamData';

export default function Chart({ teamData }) {
  const ref = useRef(null);
  useEffect(() => {
    addScatterPlot(teamData, ref);
  }, [teamData, ref]);
  return (
    <Layout
      description="A scatter-plot comparing the offensive and defensive rating of all NBA teams"
      title="NBA Efficiency Landscape"
    >
      <div>
        <h1 className="pt-1 pb-2">NBA Efficiency Landscape</h1>
        <p className="mb-4">
          A scatter plot comparing the offensive and defensive ratings of the each NBA team. The
          data comes from <a href="https://www.nba.com/">nba.com</a>. Hover over the logos to view
          the offensive rating, defensive rating and the net rating.
        </p>
        <div ref={ref}></div>
        {/* <div className="flex justify-around flex-wrap">
          <TeamLeaderBoard
            title="Top Net Rating"
            className="m-2 w-10/12"
            selector={(teamData) => (teamData.offRating - teamData.defRating).toFixed(1)}
            teams={mostEfficientTeams(teamData)}
          />
          <TeamLeaderBoard
            title="Most Wins"
            className="m-2 w-5/12"
            selector={(teamData) => teamData.wins}
            teams={mostWins(teamData)}
          />
          <TeamLeaderBoard
            title="Offensive Rating"
            className="m-2 w-5/12"
            selector={(teamData) => teamData.offRating}
            teams={topOffensiveTeams(teamData)}
          />
          <TeamLeaderBoard
            title="Defensive Rating"
            className="m-2 w-5/12"
            selector={(teamData) => teamData.defRating}
            teams={topDefensiveTeams(teamData)}
          /> 
        </div> */}
      </div>
    </Layout>
  );
}

const mostEfficientTeams = (teamData: TeamData[]) =>
  sortBy<TeamData>((d) => d.defRating - d.offRating, teamData).slice(0, 10);

const topOffensiveTeams = (teamData: TeamData[]) =>
  sortBy<TeamData>((d) => -1 * d.offRating, teamData).slice(0, 10);

const topDefensiveTeams = (teamData: TeamData[]) =>
  sortBy<TeamData>((d) => d.defRating, teamData).slice(0, 10);

const mostWins = (teamData: TeamData[]) =>
  sortBy<TeamData>((d) => -1 * d.wins, teamData).slice(0, 10);

export const getStaticProps: GetStaticProps = async () => {
  const teamData = await getAdvancedTeamData();
  return {
    props: { teamData },
  };
};
