import {
  AuthConfirm,
  AuthReset,
  CreateFriend,
  CreateGroup,
  EditFriend,
  Friends,
  Groups,
  HomeLogged,
  HomeLogout,
  Places,
  Profile,
  SignUp,
  Users,
} from 'pages';
import { RouteObject } from 'react-router-dom';
import { Roles } from 'types';

export type PageRole = Roles | 'ALL';
type PageInfo = {
  access: PageRole;
  menuName?: string;
};
export type PageProps = RouteObject & PageInfo;
export type PrivatePagesName =
  | 'home'
  | 'profile'
  | 'friends'
  | 'groups'
  | 'places'
  | 'users'
  | 'editFriend'
  | 'createGroup'
  | 'createFriend'
  | 'pagedFriends';
export type UnauthorizedPagesName =
  | 'home'
  | 'authConfirm'
  | 'authReset'
  | 'signUp';
type PrivatePagesType = Record<PrivatePagesName, PageProps>;
type UnauthorizedPagesType = Record<UnauthorizedPagesName, PageProps>;

export const PRIVATE_PAGES: PrivatePagesType = {
  home: {
    path: '/',
    access: 'ALL',
    element: <HomeLogged />,
    menuName: 'Home',
  },
  profile: {
    path: '/profile',
    access: 'HELPER',
    element: <Profile />,
  },
  friends: {
    path: '/friends',
    access: 'HELPER',
    element: <Friends />,
    menuName: 'Friends',
  },
  pagedFriends: {
    path: '/friends/paged/:paged',
    access: 'HELPER',
    element: <Friends />,
  },
  groups: {
    path: '/groups',
    access: 'HELPER',
    element: <Groups />,
    menuName: 'Groups',
  },
  places: {
    path: '/places',
    access: 'PLACEMOD',
    element: <Places />,
    menuName: 'Places',
  },
  users: {
    access: 'MOD',
    path: '/users',
    menuName: 'Users',
    element: <Users />,
  },
  createFriend: {
    access: 'HELPER',
    path: '/friend/create',
    element: <CreateFriend />,
  },
  createGroup: {
    access: 'GROUPMOD',
    path: '/group/create',
    element: <CreateGroup />,
  },
  editFriend: {
    access: 'HELPER',
    path: '/friend/:id/edit',
    element: <EditFriend />,
  },
};

export const UNAUTHORIZED_PAGES: UnauthorizedPagesType = {
  home: {
    path: '/',
    access: 'ALL',
    element: <HomeLogout />,
    menuName: 'Sign In',
  },
  authConfirm: {
    access: 'ALL',
    path: '/auth-confirm',
    element: <AuthConfirm />,
    menuName: 'Sign In Confirmation',
  },
  authReset: {
    access: 'ALL',
    path: '/auth-reset',
    element: <AuthReset />,
    menuName: 'Reset password',
  },
  signUp: {
    access: 'ALL',
    path: '/sign-up',
    element: <SignUp />,
  },
};
