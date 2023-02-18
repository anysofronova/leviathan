export enum UserError {
  ALREADY_REGISTERED = 'User is already registered',
  NOT_FOUND = 'User is not found',
  WRONG_PASSWORD = 'Incorrect Password',
  LOGIN_FAILED = 'Login was not successful, wrong credentials',
}

export enum LifetimeValues {
  COOKIE_MAX_AGE = 30 * 24 * 60 * 60 * 1000,
}
