import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import PlayIcon from '@material-ui/icons/PlayCircleOutlineRounded';
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
        
        <div className="movieplayer-episodes">
          <div className="movieplayer-episode">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              >
                <PlayIcon
                  fontSize="large"
                />
            </IconButton>
            <div className="movieplayer-episode__name">
              Episode
            </div>
          </div>
          <div className="movieplayer-episode">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              >
                <PlayIcon
                  fontSize="large"
                />
            </IconButton>
            <div className="movieplayer-episode__name">
              Episode
            </div>
          </div>
        </div>
      </div>
    )
  }
}
