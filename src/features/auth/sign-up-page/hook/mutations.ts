// src/features/auth/hooks.ts
import { useMutation } from '@tanstack/react-query';
import AuthServices from '../../services/api';
import  type { ISignUpPayload, IUser } from '../types';

export function useSignUpMutation() {
  return useMutation<IUser, Error, ISignUpPayload>({
    mutationFn: async (payload) => await AuthServices.signUp(payload),
  });
}
