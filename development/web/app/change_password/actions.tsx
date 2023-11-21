'use server'

import PasswordChangeUseCase from '../../../usecases/auth/passwordChangeUseCase'
import UserService from '../../../infrastructure/src/users/userService'

export async function changePassword(prevState: any, formData: FormData) {
  try {
    const useCase = new PasswordChangeUseCase(new UserService());
    useCase.mail = formData.get('email')?.toString();
    useCase.userName = formData.get('username')?.toString();
    useCase.password = formData.get('password')?.toString();
    return await useCase.handle();
  } catch (e) {
    console.error(e);
    return { message: 'Failed to create user' }
  }
}