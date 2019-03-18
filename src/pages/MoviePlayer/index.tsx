import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';

import { IMoviePlayerProps } from './interfaces';

import './MoviePlayer.scss';

export default class MoviePlayer extends React.Component<IMoviePlayerProps> {
  public render() {
    return (
      <div className="movieplayer">
        <Link
          to="/"
          className="movieplayer-back">
          <IconButton
            color="inherit"
            aria-label="back"
            >
            <BackIcon fontSize="large"/>
          </IconButton>
        </Link>
        
        <ReactPlayer
          url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
          playing={false}
          className="movieplayer-player"
          controls={true}
          />
        
        <div className="movieplayer-info">
          <div className="movieplayer-info__name"></div>
          <div className="movieplayer-info__actors"></div>
          <div className="movieplayer-info__description"></div>
        </div>
      </div>
    )
  }
}
