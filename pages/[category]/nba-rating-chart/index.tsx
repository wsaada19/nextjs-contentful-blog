import Layout from '@components/layouts/PageLayout';
import { getAdvancedTeamData } from '@services/nbaService/nbaClient';
import { sortBy } from '@utilities';
import { addScatterPlot } from 'graphs/nbaScatterplot';
import { TeamLeaderBoard } from 'graphs/TeamLeaderboard';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect, useRef } from 'react';
import { TeamData } from 'types/nbaTeamData';

export default function Chart({ teamData, lastUpdated }) {
  const ref = useRef(null);
  useEffect(() => {
    addScatterPlot(teamData, ref);
  }, [teamData, ref]);
  return (
    <Layout
      description="A scatter-plot comparing the offensive and defensive rating of all NBA teams"
      title="NBA Team Rating Scatter Plot"
    >
      <div className="md:px-8">
        <h1 className="pt-1 pb-2">NBA Rating Landscape</h1>
        <p className="mb-4">
          A scatter plot comparing the offensive and defensive ratings for each NBA team. The data
          comes from <a href="https://www.nba.com/">nba.com</a>. Hover over the logos to view the
          offensive rating, defensive rating and the net rating.
        </p>
        <div ref={ref}></div>
        <p className="my-3 text-sm">Last updated {lastUpdated}.</p>
        <TeamLeaderBoard
          title="Top 10 Net Rating"
          className="m-y-2"
          selector={(teamData) => (teamData.offRating - teamData.defRating).toFixed(1)}
          teams={mostEfficientTeams(teamData)}
        />
      </div>
    </Layout>
  );
}

const mostEfficientTeams = (teamData: TeamData[]) =>
  sortBy<TeamData>((d) => d.offRating - d.defRating, teamData).slice(0, 10);

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          category: 'portfolio',
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const teamData = await getAdvancedTeamData();
  const lastUpdated = new Date().toLocaleDateString();
  return {
    props: { teamData, lastUpdated },
  };
};
