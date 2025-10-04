import { useMutation } from "@tanstack/react-query";
// import AuthServices from "../";

export function useSignUpMutation() {
  return useMutation({
    // mutationFn: async (payload: { email: string; password: string }) =>
    //   await AuthServices.login(payload),
  });
}
