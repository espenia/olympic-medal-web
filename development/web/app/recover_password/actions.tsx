'use server'

import {PasswordRecoverUseCaseImpl} from "@/src/server-container";

export async function recoverPassword(prevState: any, formData: FormData) {
  try {
    PasswordRecoverUseCaseImpl.mail = formData.get('email')?.toString();
    //PasswordRecoverUseCaseImpl.recoverUrl = "http://localhost:35000/change_password";
    PasswordRecoverUseCaseImpl.recoverUrl = 'https://grupo-5.2023.tecnicasdedisenio.com.ar/change_password';
    return await PasswordRecoverUseCaseImpl.handle();
  } catch (e) {
    console.error(e);
    return { message: 'Failed to send mail' }
  }
}
