import * as React from 'react';

import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayIcon from '@material-ui/icons/PlayCircleOutlineRounded';
import { Link } from 'react-router-dom';

import { IMovieListItemProps } from './interfaces';

import './MovieListItem.scss';

export default class MovieListItem extends React.Component<IMovieListItemProps> {

  public addDefaultSrc(ev){
    ev.target.src = 'https://res.cloudinary.com/mikekrantz/image/upload/v1555356246/lloyd-dirks-74271-unsplash.jpg'
  }

  public render() {

    const { name, id, poster } = this.props;

    return (
      <Grid
        item={true}
        lg={2}
        md='auto'
        sm='auto'
        className="movielist-item"
      >
        <Link to={`watch/${id}`}
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
            variant="h5"
            color="textSecondary"
            className="movielist-item__container-title"
            gutterBottom={true}>
            {name}
          </Typography>
        </Link>
        <img
          src={`http://localhost${poster}`}
          onError={this.addDefaultSrc}
          className="movielist-item__image"
        />
      </Grid>
    )
  }
}
