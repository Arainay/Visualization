import React, { useEffect, useRef } from 'react';
import { select } from 'd3-selection';
import { linkHorizontal } from 'd3-shape';
import { hierarchy, tree } from 'd3-hierarchy';
import Svg from '@app/components/Svg';
import './countries-hierarchy.scss';

const CountriesHierarchy = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/curran/data/gh-pages/un/placeHierarchy/countryHierarchy.json')
      .then(response => response.json())
      .then(data => {
        const { height, width } = svgRef.current.getBoundingClientRect();

        const dataHierarchy = hierarchy(data);
        const getTree = tree()
          .size([height, width]);
        const dataHierarchyTree = getTree(dataHierarchy);
        const dataLinks = dataHierarchyTree.links();

        const svgSelection = select(svgRef.current);

        svgSelection
          .selectAll('path')
          .data(dataLinks)
            .enter()
            .append('path')
              .attr('class', 'countries-hierarchy__link')
              .attr(
                'd',
                linkHorizontal()
                  .x(d => d.y)
                  .y(d => d.x)
              );
      });
  }, []);

  return (
    <Svg ref={svgRef} className="countries-hierarchy">

    </Svg>
  );
};

export default CountriesHierarchy;
