import * as React from 'react';

import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import { Link } from 'react-router-dom';

import { IMovieListItemProps } from './interfaces';

import './MovieListItem.scss';

export default class MovieListItem extends React.Component<IMovieListItemProps> {

  public render() {

    const { poster, name } = this.props;

    return (
      <Grid
        item={true}
        lg={2}
        md='auto'
        sm='auto'
        className="movielist-item"
      >
        <Link to={`movies/watch/${name}`}
          className="movielist-item__container">
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            className="movielist-item__container-play"
            >
              <PlayIcon
                fontSize="large"
              />
          </IconButton>
          <Typography
            variant="body1"
            color="textSecondary"
            className="movielist-item__container-title"
            gutterBottom={true}>
            {name}
          </Typography>
        </Link>
        <img
          src={poster}
          className="movielist-item__image"
        />
        
      </Grid>
    )
  }
}
