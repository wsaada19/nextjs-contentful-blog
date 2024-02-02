const MARGIN = { LEFT: 60, RIGHT: 30, TOP: 10, BOTTOM: 60 };
const WIDTH = 790 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 675 - MARGIN.TOP - MARGIN.BOTTOM;

import { sortBy } from '@utilities';
import * as d3 from 'd3';
import { TeamBettingData } from 'types/nbaTeamData';

export function addOverUnderChart(
  teamData: TeamBettingData[],
  ref: React.RefObject<HTMLDivElement>
) {
  d3.select('#over-under-graph').remove();

  const height = HEIGHT + MARGIN.TOP + MARGIN.BOTTOM;
  const width = WIDTH + MARGIN.LEFT + MARGIN.RIGHT;
  const svg = d3
    .select(ref.current)
    .append('svg')
    .attr('id', 'over-under-graph')
    .attr('viewBox', `0 0 ${width} ${height}`);

  const tooltip = d3
    .select(ref.current)
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', '0');

  const g = svg.append('g').attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', WIDTH / 2)
    .attr('y', HEIGHT + 55)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .style('fill', '#14376c')
    .text('Times a team has exceeded their win projection');

  teamData = sortBy<TeamBettingData>((d) => d.overs, teamData);

  const x = d3
    .scaleLinear()
    .domain([0, d3.max(teamData, (d) => d.overs)])
    .range([0, WIDTH]);

  const y = d3
    .scaleBand()
    .domain(teamData.map((d) => d.team))
    .range([0, HEIGHT])
    .paddingInner(0.2)
    .paddingOuter(0.2);

  const xAxisCall = d3.axisBottom(x).ticks(5).tickSize(5);
  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${HEIGHT + 10})`)
    .call(xAxisCall);

  const yAxisCall = d3.axisLeft(y).tickSize(0);
  g.append('g').attr('class', 'y axis').call(yAxisCall);

  const rects = g.selectAll('rect').data(teamData);
  const images = g.selectAll('image').data(teamData);

  rects
    .enter()
    .append('rect')
    .attr('y', (d) => y(d.team))
    .attr('x', 0)
    .attr('width', 0)
    .attr('height', y.bandwidth)
    .attr('fill', (d) => d.color || '#14376c')
    .on('mouseover', function (event, d) {
      tooltip.html(() => {
        let html = `<p class="title"><strong>${d.team}</strong></p>`;
        html += `<p> Overs: <strong>${d.overs}</strong></p>`;
        html += `<p> Unders: <strong>${d.unders}</strong></p>`;
        return html;
      });
      tooltip
        .style('top', event.pageY - 48 + 'px')
        .style('left', event.pageX + 10 + 'px')
        .style('background', d.color)
        .transition()
        .duration(200)
        .style('opacity', 0.9);
    })
    .on('mouseout', function () {
      tooltip.transition().duration(500).style('opacity', 0);
    })
    .transition()
    .duration(1000)
    .ease(d3.easeLinear)
    .attr('width', (d) => x(d.overs));

  const imageSize = 20;
  images
    .enter()
    .append('image')
    .attr('xlink:href', (d) => d.logo || '/logos/CLE.svg')
    .attr('x', '0')
    .attr('y', (d) => y(d.team) - 1)
    .attr('width', `${imageSize}px`)
    .attr('height', `${imageSize}px`)
    .transition()
    .duration(1000)
    .ease(d3.easeLinear)
    .attr('x', (d) => x(d.overs) + 3);
}
