'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function createResult(prevState: any, formData: FormData) {
  const schema = z.object({
    hours: z.coerce.number().min(0).optional(),
    minutes: z.coerce.number().min(0).max(59).optional(),
    seconds: z.coerce.number().min(0).max(59),
  })
  const data = schema.parse({
    hours: formData.get('hours'),
    minutes: formData.get('minutes'),
    seconds: formData.get('seconds')
  })

  try {
    //await 
    revalidatePath('/')
    return { message: `¡Gracias por enviar tus calificaciones!\nApenas sean verificadas por un admin, las veras en tu medallero` }
  } catch (e) {
    return { message: 'Failed to create todo' }
  }
}

export async function deleteTodo(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  })
  const data = schema.parse({
    id: formData.get('id'),
    todo: formData.get('todo'),
  })

  try {
    // await sql`
    //   DELETE FROM todos
    //   WHERE id = ${data.id};
    // `

    revalidatePath('/')
    return { message: `Deleted todo ${data.todo}` }
  } catch (e) {
    return { message: 'Failed to delete todo' }
  }
}