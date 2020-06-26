import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SmileFace from '@app/components/SmileFace';
import BarChart from '@app/components/BarChart';
import ScatterPlot from '@app/components/ScatterPlot';
import Line from '@app/components/Line';

const Routes = () => (
  <Switch>
    <Route path="/smile">
      <SmileFace/>
    </Route>
    <Route path="/bar">
      <BarChart/>
    </Route>
    <Route path="/scatter-plot">
      <ScatterPlot/>
    </Route>
    <Route path="/line">
      <Line/>
    </Route>
    <Redirect to="/smile"/>
  </Switch>
);

export default Routes;
