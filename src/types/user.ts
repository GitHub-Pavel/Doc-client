export type Roles =
  | 'ADMIN'
  | 'MOD'
  | 'GROUPMOD'
  | 'HELPER'
  | 'NOTACTIVATE'
  | 'PLACEMOD';

export type User = {
  id: number;
  roles: Roles[];
  username: string;
  email: {
    id: number;
    email: string;
    userId: number;
    isActivated: boolean;
  };
};

export type UserDto = {
  user: User | null;
};
