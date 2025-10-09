
export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  role?: string;
}
