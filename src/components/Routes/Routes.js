import React, { lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const SmileFace = lazy(() => import(/* webpackPrefetch: true */ '@app/components/SmileFace'));
const BarChart = lazy(() => import(/* webpackPrefetch: true */ '@app/components/BarChart'));
const ScatterPlot = lazy(() => import(/* webpackPrefetch: true */ '@app/components/ScatterPlot'));
const Line = lazy(() => import(/* webpackPrefetch: true */ '@app/components/Line'));

const Routes = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route exact path="/">
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
      <Redirect to="/bar"/>
    </Switch>
  </Suspense>
);

export default Routes;
