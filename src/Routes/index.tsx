import * as React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import App from 'src/App';
import MoviePlayer from 'src/MoviePlayer';

export default class Routes extends React.Component {
  public render() {
    return (
      <Router>
        <Switch>
          <Route exact={true} path="/" component={App} />
          <Route path="/watch/:name" component={MoviePlayer} />
        </Switch>
      </Router>
    )
  }
}
