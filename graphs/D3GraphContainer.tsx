import { getAdvancedTeamData } from '@services/nbaService/nbaClient';
import React, { useEffect, useRef } from 'react';
import { TeamData } from 'types/nbaTeamData';
import { addRedditBarChart } from './d3/nbaRedditSubscribers';
import { addScatterPlot } from './d3/nbaScatterplot';

export type D3GraphContainerProps = {
  graphId: string;
  data?: TeamData[];
};

export const D3GraphContainer = ({ graphId, data = [] }: D3GraphContainerProps) => {
  const ref = useRef(null);
  useEffect(() => {
    getGraphById(graphId, ref, data);
  }, [ref, graphId, data]);
  return <div className="my-2" ref={ref}></div>;
};

// TODO: Add way to pass data via contentful?
const getGraphById = async (
  id: string,
  ref: React.RefObject<HTMLDivElement>,
  data?: TeamData[]
): Promise<void> => {
  if (id === 'nbaRatingPlot') {
    if (data.length > 0) {
      addScatterPlot(data, ref);
    } else {
      const teamData = await getAdvancedTeamData();
      addScatterPlot(teamData, ref);
    }
  } else if (id === 'nbaRedditGraph') {
    const teamData = await getAdvancedTeamData();
    addRedditBarChart(teamData, ref);
  }
};
