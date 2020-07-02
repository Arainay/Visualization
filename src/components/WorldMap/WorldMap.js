import React, { useEffect, useRef } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';
import Svg from '@app/components/Svg';

const WorldMap = () => {
  const svgRef = useRef(null);

  // todo add service
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(data => {
        console.log(data);



        const projection = geoMercator();
        const pathGenerator = geoPath().projection(projection);

        const { height, width } = svgRef.current.getBoundingClientRect();

        const svgSelection = select(svgRef.current);

        console.log({height, width, svgSelection, pathGenerator});
      })
      .catch(error => {
        console.error(error);
      });




  }, []);

  return (
    <Svg ref={svgRef}>

    </Svg>
  );
};

export default WorldMap;
