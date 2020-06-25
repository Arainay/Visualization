import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SmileFace from '@app/components/SmileFace';
import BarChart from '@app/components/BarChart';
import ScatterPlot from '@app/components/ScatterPlot';

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
    <Redirect to="/smile"/>
  </Switch>
);

export default Routes;
