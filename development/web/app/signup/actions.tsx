'use server'

import { z } from 'zod'
import RegistrationUseCase from '../../../usecases/auth/registrationUseCase'
import UserDto from '../../../entities/users/user'
import UserService from '../../../infrastructure/src/users/userService'

export async function signup(prevState: any, formData: FormData) {
  const schema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
    email: z.string().email().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    birthdate: z.coerce.date()
  })
  const data : UserDto = schema.parse({
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    birthdate: formData.get('birthdate'),
  })

  try {
    const useCase = new RegistrationUseCase(new UserService());
    useCase.user = data;
    await useCase.handle();
  } catch (e) {
    console.error(e);
    return { message: 'Failed to create user' }
  }
}