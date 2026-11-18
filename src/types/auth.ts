export interface AuthData {
  email: string;
  password: string;
}

export interface UserData {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
}

export interface AuthInfo extends UserData {
  token: string;
}
