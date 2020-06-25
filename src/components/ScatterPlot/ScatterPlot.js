import React, { useRef } from 'react';
import Svg from '@app/components/Svg';
import dataset from './data/auto-mpg.csv';

console.log(dataset);

const ScatterPlot = () => {
  const svgRef = useRef(null);

  return (
    <Svg ref={svgRef}>

    </Svg>
  );
};

export default ScatterPlot;
