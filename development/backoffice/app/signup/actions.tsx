'use server'

import { z } from 'zod'
import UserDto from '../../../entities/users/user'
import { RegistrationUseCaseImpl } from '@/src/server-container'

export async function signup(prevState: any, formData: FormData) {
  const schema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
    email: z.string().email().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    birthdate: z.coerce.date(),
    isAthlete: z.boolean(),
    country: z.string().min(1)
  })
  const data : UserDto = schema.parse({
    username: formData.get('username'),
    password: formData.get('password'),
    email: formData.get('email'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    birthdate: formData.get('birthdate'),
    isAthlete: false,
    country: formData.get('country')
  });

  try {
    RegistrationUseCaseImpl.user = data;
    await RegistrationUseCaseImpl.handle();
  } catch (e) {
    console.error(e);
    return { message: 'Failed to create user' }
  }
}