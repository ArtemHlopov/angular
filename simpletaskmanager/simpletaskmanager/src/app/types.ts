export type Task = {
  id: number;
  title: string;
  status?: boolean;
};

export const idModyf = {
  start: 0,
  next: 1,
};
export const lskey = 'taskdata';

export const ModBtn = {
  add: 'addBtn',
  rem: 'remBtn',
};

export const userLogged = {
  loggedin: true,
  loggedout: false,
};
export type UrlIdAtr = {
  id: string;
};
export type QueryStatus = {
  status: string;
};
