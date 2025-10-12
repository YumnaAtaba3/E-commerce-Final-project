/* eslint-disable @typescript-eslint/no-unused-vars */
import { httpClient } from "../../../lib/axios";
import type { ILoginPayload, ILoginResponse } from "../log-in-page/types";
import type { ISignUpPayload, IUser } from "../sign-up-page/types";
import { userStorage } from "../storage/userStorage";

class AuthServices {
  private readonly usersEndPoint = "/users";
  private readonly authEndPoint = "/auth";

  async signUp(payload: ISignUpPayload): Promise<IUser> {
    const response = await httpClient.post<IUser>(this.usersEndPoint, payload);
    return response.data;
  }

  async login(payload: ILoginPayload): Promise<ILoginResponse> {
    const response = await httpClient.post<ILoginResponse>(
      `${this.authEndPoint}/login`,
      payload
    );

    // ✅ Store only the access token string
    const token = response.data.access_token;
    if (token) userStorage.set(token);

    return response.data;
  }

  async getProfile(_p0?: string): Promise<IUser> {
    // ✅ Automatically use the token from userStorage
    const token = userStorage.get();
    if (!token) throw new Error("No access token found — please log in again.");

    const response = await httpClient.get<IUser>(`${this.authEndPoint}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<ILoginResponse> {
    const response = await httpClient.post<ILoginResponse>(
      `${this.authEndPoint}/refresh-token`,
      { refreshToken }
    );
    return response.data;
  }
}

export default new AuthServices();
