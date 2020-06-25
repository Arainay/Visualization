import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from '@app/components/Main';
import Navigation from '@app/components/Navigation';
import SmileFace from '@app/components/SmileFace';
import BarChart from '@app/components/BarChart';
import ScatterPlot from '@app/components/ScatterPlot';

const Visualization = () => (
  <Main>
    <Navigation/>
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
  </Main>
);

export default Visualization;
