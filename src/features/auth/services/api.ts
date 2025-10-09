/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "../../../lib/axios";
import type { ILoginPayload, ILoginResponse } from "../log-in-page/types";
import type { ISignUpPayload, IUser } from "../sign-up-page/types";

class AuthServices {
  private readonly usersEndPoint = "/users";
  private readonly authEndPoint = "/auth";

 
  async signUp(payload: ISignUpPayload): Promise<IUser> {
    try {
      const response = await httpClient.post<IUser>(this.usersEndPoint, payload);
      return response.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Sign up failed";
      throw new Error(message);
    }
  }


  async login(payload: ILoginPayload): Promise<ILoginResponse> {
    try {
      const response = await httpClient.post<ILoginResponse>(
        `${this.authEndPoint}/login`,
        payload
      );
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  }


  async getProfile(accessToken: string): Promise<IUser> {
    try {
      const response = await httpClient.get<IUser>(`${this.authEndPoint}/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to fetch user profile";
      throw new Error(message);
    }
  }

 
  async refreshToken(refreshToken: string): Promise<ILoginResponse> {
    try {
      const response = await httpClient.post<ILoginResponse>(
        `${this.authEndPoint}/refresh-token`,
        { refreshToken }
      );
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Token refresh failed";
      throw new Error(message);
    }
  }
}

export default new AuthServices();
