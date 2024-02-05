export type SignInDto = {
  send: 'auth-secret' | false;
  authTokenExpire: number;
};

export type SignUpDto = {
  send: 'activation-link' | false;
};
