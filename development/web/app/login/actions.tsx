'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function login(prevState: any, formData: FormData) {
  const schema = z.object({
    username: z.string().email().min(1),
    password: z.string().min(1),
  })
  const data = schema.parse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  try {
    //await 
    revalidatePath('/')
    return { message: `Login for user ${data.username}` }
  } catch (e) {
    return { message: 'Failed to login' }
  }
}