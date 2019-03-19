import * as React from 'react';

import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import App from 'src/pages/App';
import Auth from 'src/pages/Auth';
import MoviePlayer from 'src/pages/MoviePlayer';
import store from 'src/store';

export default class Routes extends React.Component {
  public render() {
    return (
      <Provider store={store()}>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={App} />
            <Route exact={true} path="/login" component={Auth} />
            <Route path="/watch/:id" component={MoviePlayer} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}
