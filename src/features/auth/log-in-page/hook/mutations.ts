import { useMutation } from "@tanstack/react-query";
import AuthServices from "../../services/api";
import type { ILoginPayload, ILoginResponse } from "../types";

export function useLoginMutation() {
  return useMutation<ILoginResponse, Error, ILoginPayload>({
    mutationFn: async (payload) => await AuthServices.login(payload),
  });
}
