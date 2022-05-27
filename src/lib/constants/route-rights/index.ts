const USER = 'user';
const ADMIN = 'admin';
const DEVELOPER = 'developer';
const GUEST = 'guest';


export const adminOnly = [ADMIN, DEVELOPER];
export const authorizedOnly = [USER, ADMIN, DEVELOPER];

export const USER_TYPES = {
  USER,
  ADMIN,
  DEVELOPER,
  GUEST
};

export const LOGOUT_REDIRECT = 'logout_redirect';
