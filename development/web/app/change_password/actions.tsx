'use server'

import { ChangePasswordUseCaseImpl } from '../../src/server-container'

export async function changePassword(prevState: any, formData: FormData) {
  try {
    ChangePasswordUseCaseImpl.mail = formData.get('email')?.toString();
    ChangePasswordUseCaseImpl.userName = formData.get('username')?.toString();
    ChangePasswordUseCaseImpl.password = formData.get('password')?.toString();
    return await ChangePasswordUseCaseImpl.handle();
  } catch (e) {
    console.error(e);
    return { message: 'Failed to create user' }
  }
}