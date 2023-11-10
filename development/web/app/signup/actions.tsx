'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function signup(prevState: any, formData: FormData) {
  const schema = z.object({
    username: z.string().email().min(1),
    password: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    birthdate: z.coerce.date()
  })
  const data = schema.parse({
    username: formData.get('username'),
    password: formData.get('password'),
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    birthdate: formData.get('birthdate'),
  })

  try {
    //await 
    revalidatePath('/')
    return { message: `User created ${data}` }
  } catch (e) {
    return { message: 'Failed to create user' }
  }
}