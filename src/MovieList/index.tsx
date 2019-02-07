import * as React from 'react';

import { Grid } from '@material-ui/core';

import MovieListItem from 'src/MovieListItem';

import { MovieListProps } from './interfaces';

import './MovieList.scss';

export default class MovieList extends React.Component<MovieListProps> {
  public render() {
    let tileData = [
      'https://res.cloudinary.com/mikekrantz/image/upload/v1549543148/photo5930476635021224091.jpg',
      'https://res.cloudinary.com/mikekrantz/image/upload/v1549543147/photo5932727889374062658.jpg',
      'https://res.cloudinary.com/mikekrantz/image/upload/v1549543147/photo5923621356115699908.jpg',
      'https://res.cloudinary.com/mikekrantz/image/upload/v1549543145/photo5937076221638715642.jpg',
      'https://res.cloudinary.com/mikekrantz/image/upload/v1549543145/photo5930475896286849251.jpg',
      'https://res.cloudinary.com/mikekrantz/image/upload/v1549542827/photo5901317346134435973.jpg',
      'https://res.cloudinary.com/mikekrantz/image/upload/v1549542754/photo5348199058184972995.jpg',
      'https://res.cloudinary.com/mikekrantz/image/upload/v1549542696/WallpapersGram_-_deadpool-vs-thanos-pf-2160x3840_1.jpg'
    ];

    for (let i = 0; i <= 10; i++) {
      tileData = [...tileData, 'https://res.cloudinary.com/mikekrantz/image/upload/v1549543148/photo5930476635021224091.jpg']
    }

    const movies = tileData.map((image) => ({
      author: 'author',
      featured: true,
      img: image,
      title: 'Image',
    }));

    return (
      <Grid
        container={true}
        className="movielist"
        spacing={0}
        wrap='wrap'
        >
        {
          movies.map((data) => (
            <MovieListItem
              {...data}
            />
          ))
        }
      </Grid>
    )
  }
}
