'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function changePrivacy(prevState: any, formData: FormData) {
  const schema = z.object({
    public: z.boolean(),
  })
  const data = schema.parse({
    public: formData.get('public'),
  })

  try {
    //await 
    revalidatePath('/')
    return { message: `Privacy changed to ${data.public ? "public" : "private"}` }
  } catch (e) {
    return { message: 'Failed to change privacy' }
  }
}