export interface IEntryMember {
  email: string;
  password: string;
  name: string;
  user_role_code: role;
  user_state_code: state;
}

export enum role {
  admin = 0,
  super = 1,
  user = 2,
}

export enum state {
  wait = 0,
  use = 1,
  out = 2,
}
