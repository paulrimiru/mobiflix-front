import * as React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import './App.scss';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <AppBar
          position='fixed'
          className="app-bar"
        >
          <Toolbar className="app-bar__toolbar">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              className="app-bar__toolbar-hum"
              >
              <MenuIcon fontSize="large"/>
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              noWrap={true}
              className="app-bar__toolbar-header"
              >
              Movies
            </Typography>
            <div/>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              className="app-bar__toolbar-searchicon"
              >
              <SearchIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default App;
