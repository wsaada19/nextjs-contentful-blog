const MARGIN = { LEFT: 60, RIGHT: 30, TOP: 30, BOTTOM: 60 };
const WIDTH = 720 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 550 - MARGIN.TOP - MARGIN.BOTTOM;

import * as d3 from 'd3';
import { TeamData } from 'types/nbaTeamData';

export function addScatterPlot(teamData: TeamData[], ref: React.RefObject<any>) {
  const width = WIDTH + MARGIN.LEFT + MARGIN.RIGHT;
  const height = HEIGHT + MARGIN.TOP + MARGIN.BOTTOM;

  d3.select('#existing-graph').remove();

  const svg = d3
    .select(ref.current)
    .append('svg')
    .attr('id', 'existing-graph')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .style('background-color', '#ecd6b6')
    .style('border', '0.5px solid black')
    .style('margin', '0 auto');

  const g = svg.append('g').attr('transform', `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`);

  // Tooltip
  var tooltip = d3
    .select(ref.current)
    .append('div')
    .attr('class', 'test-tooltip')
    .style('opacity', '0');

  addLabels(g);

  const x = d3.scaleLinear().range([0, WIDTH]);
  const y = d3.scaleLinear().range([HEIGHT, 0]);

  const xAxisGroup = g
    .append('g')
    .attr('class', 'x axis')
    .attr('transform', `translate(0, ${HEIGHT})`);

  const yAxisGroup = g.append('g').attr('class', 'y axis');

  x.domain([d3.min(teamData, (d) => d.offRating) - 1, d3.max(teamData, (d) => d.offRating) + 1]);
  y.domain([d3.max(teamData, (d) => d.defRating) + 1, d3.min(teamData, (d) => d.defRating) - 1]);

  const xAxisCall = d3.axisBottom(x).tickSize(0).ticks(0);
  xAxisGroup
    .attr('transform', `translate(0, ${HEIGHT / 2})`)
    .call(xAxisCall)
    .selectAll('text');

  const yAxisCall = d3.axisLeft(y).tickSize(0).ticks(0);
  yAxisGroup.attr('transform', `translate(${WIDTH / 2}, 0)`).call(yAxisCall);

  const images = g.selectAll('image').data(teamData, (d: TeamData) => d.name);

  images.exit().remove();

  const imageSize = 36;
  images
    .enter()
    .append('image')
    .attr('xlink:href', (d) => d.logo)
    .attr('x', (d) => x(d.offRating) - imageSize / 2)
    .attr('y', (d) => y(d.defRating) - imageSize / 2)
    .attr('width', `${imageSize}px`)
    .attr('height', `${imageSize}px`)
    .on('mouseover', function (event, d) {
      tooltip.html(() => {
        let html = `<p class="title"><strong>${d.name}</strong></p>`;
        html += `<p> ORTG: <strong>${d.offRating}</strong></p>`;
        html += `<p> DRTG: <strong>${d.defRating}</strong></p>`;
        html += `<p> NET: <strong>${(d.offRating - d.defRating).toFixed(1)}</strong></p>`;
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
    });
}

const addLabels = (g) => {
  g.append('text')
    .attr('class', 'x axis-label')
    .attr('x', WIDTH / 2)
    .attr('y', HEIGHT + 40)
    .attr('font-size', '20px')
    .attr('text-anchor', 'middle')
    .style('font-weight', 'bold')
    .style('fill', '#14376c')
    .text('Offensive Rating');

  g.append('text')
    .attr('class', 'y axis-label')
    .attr('x', -(HEIGHT / 2))
    .attr('y', -30)
    .attr('font-size', '20px')
    .style('font-weight', 'bold')
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .style('fill', '#14376c')
    .text('Defensive Rating');
};
