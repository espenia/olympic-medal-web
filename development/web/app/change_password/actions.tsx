'use server'

import PasswordChangeUseCase from '../../../usecases/auth/passwordChangeUseCase'
import AuthService from '../../../infrastructure/src/auth/authService'

export async function changePassword(prevState: any, formData: FormData) {
  try {
    const useCase = new PasswordChangeUseCase(new AuthService());
    useCase.mail = formData.get('email')?.toString();
    useCase.userName = formData.get('user_name')?.toString();
    useCase.password = formData.get('password')?.toString();
    return await useCase.handle();
  } catch (e) {
    console.error(e);
    return { message: 'Failed to create user' }
  }
}