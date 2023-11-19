'use server'

import PasswordRecoverUseCase from '../../../usecases/auth/passwordRecoverUseCase'
import AuthService from '../../../infrastructure/src/auth/authService'
import {env} from "@headlessui/react/dist/utils/env";

export async function recoverPassword(prevState: any, formData: FormData) {
  try {
    const useCase = new PasswordRecoverUseCase(new AuthService());
    useCase.mail = formData.get('email')?.toString();
    useCase.recoverUrl = "http://localhost:35000/change_password";
    return await useCase.handle();
  } catch (e) {
    console.error(e);
    return { message: 'Failed to create user' }
  }
}
