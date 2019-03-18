import * as React from 'react';

import { Grid, IconButton } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackRounded';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import { http } from 'src/Utils/axios-helpers';

import { IAuthState } from './interfaces';

import './Auth.scss';

export default class Auth extends React.Component<{}, IAuthState> {
  public state = {
    loggedIn: false,
    user: {},
  }

  public onChangeListenter = (event) => {
    this.setState({
      ...this.state.user,
      [event.target.name]: event.target.value,
    })
  }

  public submitLogin = () => {
    http.post('/admin/v1/login/', { ...this.state.user })
      .then((resp) =>  {
        localStorage.setItem('mobiflix_token', resp.data.token)
        this.setState({ loggedIn: true })
      })
      .catch((error) => console.log(error.message))
  }

  public render() {
    return (
      this.state.loggedIn
        ? <Redirect to="/movies" />
        : <div className="auth">
            <div className="auth-header">Mobiflix</div>
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
            <div className="auth-container">
              <Grid
                container={true}
                spacing={0}
                wrap='wrap'
              >
                <Grid
                  item={true}
                  xs={12}
                  className='auth-container__login'
                >
                  <div className="auth-container__login-title">Login</div>
                  <input
                    className="auth-container-input"
                    name="username"
                    // tslint:disable-next-line:no-string-literal
                    value={this.state.user['username']}
                    onChange={this.onChangeListenter}
                    placeholder="Username"
                    />
                  <input
                    className="auth-container-input"
                    type="password"
                    // tslint:disable-next-line:no-string-literal
                    value={this.state.user['password']}
                    onChange={this.onChangeListenter}
                    placeholder="Password"
                    />
                  <div
                    onClick={this.submitLogin}
                    className="auth-container__button">Login</div>
                </Grid>
              </Grid>
            </div>
          </div>
    )
  }
}
