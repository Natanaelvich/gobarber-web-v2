import React from 'react';
import { Switch } from 'react-router-dom';
import SingnIn from '../pages/SingnIn';
import SingnUp from '../pages/SingnUp';
import Dashboard from '../pages/Dashboard';
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SingnIn} />
      <Route path="/signup" component={SingnUp} />

      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
