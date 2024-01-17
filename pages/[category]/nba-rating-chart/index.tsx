import Layout from '@components/layouts/PageLayout';
import { sortBy } from '@utilities';
import { D3GraphContainer } from 'graphs/D3GraphContainer';
import { TeamLeaderBoard } from 'graphs/TeamLeaderboard';
import { GetStaticPaths, GetStaticProps } from 'next';
import React, { useState } from 'react';
import { TeamData } from 'types/nbaTeamData';
import { ContentfulContentType, getEntriesOfType } from '@services/contentful';
import { D3Graph } from 'types/d3Graphic';

export default function Chart({ lastUpdated, teamData, pastTeamData }) {
  const [data, setData] = useState('current');
  const changeData = () => {
    if (data === 'current') {
      setData('past');
    } else {
      setData('current');
    }
  };
  return (
    <Layout
      description="A scatter-plot comparing the offensive and defensive rating of all NBA teams"
      title="NBA Team Rating Scatter Plot"
    >
      <h1 className="pt-1 pb-2">NBA Rating Landscape</h1>
      <p className="mb-2">
        A scatter plot comparing the offensive and defensive ratings for each NBA team in the
        2023-24 season. The data comes from <a href="https://www.nba.com/">nba.com</a>. Hover over
        the logos to view the offensive, defensive and net rating for each team.
      </p>
      <button className="text-blue-500 hover:underline" onClick={changeData}>{`${
        data === 'current' ? 'See Last Season' : 'See Current Season'
      }`}</button>
      <D3GraphContainer
        graphId="nbaRatingPlot"
        data={data === 'current' ? teamData : pastTeamData}
      />
      <p className="my-3 text-sm">Last updated {lastUpdated}</p>
      <TeamLeaderBoard
        className="m-y-3"
        teams={mostEfficientTeams(data === 'current' ? teamData : pastTeamData)}
      />
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
  const lastUpdated = new Date().toLocaleDateString('en-US', { timeZone: 'America/New_York' });
  const contentfulD3Data = await getEntriesOfType<D3Graph>(ContentfulContentType.D3Graph);
  const pastTeamData = contentfulD3Data.items.find((data) => data.graphId === 'nbaNetRating22');
  const teamData = contentfulD3Data.items.find((data) => data.graphId === 'nbaNetRating23');

  return {
    props: { lastUpdated, teamData: teamData.graphData, pastTeamData: pastTeamData.graphData },
  };
};
