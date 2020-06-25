import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { format } from 'd3-format';
import Svg from '@app/components/Svg';
import dataset from './data/dataset.csv';

const total = {
  country: 'All',
  confirmed: 0,
  recovered: 0,
  deaths: 0
};

const data = dataset.map(item => {
  total.confirmed += item.Confirmed;
  total.recovered += item.Recovered;
  total.deaths += item.Deaths;

  return {
    country: item['Country/Region'],
    confirmed: item.Confirmed,
    recovered: item.Recovered,
    deaths: item.Deaths
  };
});

const BarChart = () => {
  const [country, setCountry] = useState(total.country);
  const svgRef = useRef(null);

  const selectCountry = event => {
    setCountry(event.target.value);
  };

  const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
  };

  const updateTickView = elem =>
    elem.selectAll(".tick line")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-dasharray", 2.2);

  const draw = name => {
    const { height, width } = svgRef.current.getBoundingClientRect();
    const svg = select(svgRef.current);
    const g = svg.select('#data');

    // eslint-disable-next-line no-unused-vars
    const { country, ...counters } = !name || name === 'All' ? total : data.find(item => item.country === name);
    const counterKeys = Object.keys(counters);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleBand()
      .domain(counterKeys)
      .range([0, innerWidth])
      .padding(0.05);

    const yScale = scaleLinear()
      .domain([0, total.confirmed])
      .range([innerHeight, 0]);

    const xAxis = axisBottom(xScale);
    const yAxis = axisLeft(yScale)
      .tickFormat(format(".1s"));

    g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxis)
      .selectAll('.tick line')
        .remove();

    g.append('g')
      .call(yAxis)
      .call(updateTickView);

    g.selectAll('rect')
      .data([counters.confirmed, counters.recovered, counters.deaths])
        .enter()
        .append('rect')
          .attr('x', (_, id) => xScale(counterKeys[id]))
          .attr('y', innerHeight)
          .attr('width', xScale.bandwidth())
          .style(
            'fill',
            (_, id) => id === 0 ? 'rgba(0, 0, 255, .5)' : id === 1 ? 'rgba(0, 255, 0, .5)' : 'rgba(255, 0, 0, .5)'
          )
          .transition()
            .delay((_, id) => id * 700)
            .duration(700)
            .attr('y', d => yScale(d))
            .attr('height', d => innerHeight - yScale(d));


    // add lines
    g.append('g')
      .call(
        axisLeft(yScale)
          .ticks(yScale.ticks().length)
          .tickSize(-width + margin.left + margin.right)
          .tickFormat('')
      )
      .call(updateTickView)
      .select('.domain')
        .remove();
  };

  useEffect(() => {
    draw(country !== total.country ? country : null);
  });

  return (
    <div style={{ display: 'grid' }}>
      <select
        style={{ display: 'none' }}
        id="countries"
        name="countries"
        value={country}
        onChange={selectCountry}
      >
        <option value={total.country}>{total.country}</option>
        {data.map(item => (
          <option key={item.country} value={item.country}>{item.country}</option>
        ))}
      </select>
      <Svg ref={svgRef}>
        <g id="data" transform={`translate(${margin.left}, ${margin.top})`}/>
      </Svg>
    </div>
  );
};

export default BarChart;