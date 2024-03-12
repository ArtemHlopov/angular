export type Task = {
  userId?: number;
  user?: User;
  id: number;
  title: string;
  completed: boolean;
};
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
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
