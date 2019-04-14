import * as React from 'react';

import { List, ListItem, ListItemText, SwipeableDrawer } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';

const ApplicationBar = ({
  onSearch,
  onFilter,
  onToggleDrawer,
  searchWord,
  drawerToggle,
  selectedGenre,
  genre
}) => {
  return (
    <AppBar
      position='fixed'
      className="app-bar"
      >
        <Toolbar className="app-bar__toolbar">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            className="app-bar__toolbar-hum"
            onClick={onToggleDrawer}
            >
            <MenuIcon fontSize="large"/>
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap={true}
            className="app-bar__toolbar-header"
            >
            MobiFlix
          </Typography>
          <input
            className="app-bar__toolbar-search"
            placeholder="Search"
            value={searchWord}
            onChange={onSearch}
            />
        </Toolbar>
        <SwipeableDrawer
          open={drawerToggle}
          onClose={onToggleDrawer}
          onOpen={onToggleDrawer}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={onToggleDrawer}
            onKeyDown={onToggleDrawer}
            className="app-bar__drawer-title"
          >Genres</div>
          <div className="app-bar__drawer">
            <List>
              {genre.map((text, index) => (
                <ListItem
                  button={true} 
                  key={index}
                  onClick={onFilter(text, index)}
                  selected={selectedGenre === index.toString()}
                  >
                  <ListItemText
                    primary={
                      <div className="app-bar__drawer-item">{text}</div>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </SwipeableDrawer>
      </AppBar>
  )
}

export default ApplicationBar;
