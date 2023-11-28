import { PasswordRecoverUseCaseImpl } from '../../src/server-container';

export async function recoverPassword(prevState: any, formData: FormData) {
  try {
    PasswordRecoverUseCaseImpl.mail = formData.get('email')?.toString();
    PasswordRecoverUseCaseImpl.recoverUrl = "http://localhost:35000/change_password";
    return await PasswordRecoverUseCaseImpl.handle();
  } catch (e) {
    console.error(e);
    return { message: 'Failed to create user' }
  }
}
