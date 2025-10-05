
export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: string;
}

export interface ISignUpPayload {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
