export interface IAuthState {
  user: {
    [index: string]: string;
  };
  loggedIn: boolean;
}