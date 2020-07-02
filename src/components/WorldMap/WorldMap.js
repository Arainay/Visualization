import React, { useEffect, useRef } from 'react';
import Svg from '@app/components/Svg';

const WorldMap = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    console.log(svgRef.current);
  }, []);

  return (
    <Svg ref={svgRef}>

    </Svg>
  );
};

export default WorldMap;
