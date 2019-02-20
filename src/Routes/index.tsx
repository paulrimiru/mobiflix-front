import * as React from 'react';

import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import App from 'src/App';
import Auth from 'src/Auth';
import MoviePlayer from 'src/MoviePlayer';

export default class Routes extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={App} />
          <Route exact={true} path="/login" component={Auth} />
          <Route path="/watch/:name" component={MoviePlayer} />
        </Switch>
      </Router>
    )
  }
}
