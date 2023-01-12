import Layout from '@components/layouts/PageLayout';
import { getAdvancedTeamData } from '@services/nbaService/nbaClient';
import { sortBy } from '@utilities';
import { D3GraphContainer } from 'graphs/D3GraphContainer';
import { addScatterPlot } from 'graphs/d3/nbaScatterplot';
import { TeamLeaderBoard } from 'graphs/TeamLeaderboard';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { TeamData } from 'types/nbaTeamData';
import axios from 'axios';

export default function Chart({ lastUpdated, teamData }) {
  return (
    <Layout
      description="A scatter-plot comparing the offensive and defensive rating of all NBA teams"
      title="NBA Team Rating Scatter Plot"
    >
      <div className="md:px-8">
        <h1 className="pt-1 pb-2">NBA Rating Landscape</h1>
        <p className="mb-2">
          A scatter plot comparing the offensive and defensive ratings for each NBA team. The data
          comes from <a href="https://www.nba.com/">nba.com</a>. Hover over the logos to view the
          offensive rating, defensive rating and the net rating.
        </p>
        <D3GraphContainer graphId="nbaRatingPlot" data={teamData} />
        <p className="my-2 text-sm">Last updated {lastUpdated}.</p>
        <TeamLeaderBoard className="m-y-3" teams={mostEfficientTeams(teamData)} />
      </div>
    </Layout>
  );
}

const mostEfficientTeams = (teamData: TeamData[]) =>
  sortBy<TeamData>((d) => d.offRating - d.defRating, teamData);

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
  const lastUpdated = new Date().toLocaleDateString();
  const baseUrl = process.env.NBA_DATA_URL;
  const teamData = await axios.get(`${baseUrl}/nbaTeamEfficiency.json`);

  return {
    props: { lastUpdated, teamData: teamData.data },
  };
};
