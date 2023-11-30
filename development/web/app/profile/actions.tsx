'use server'

import { GetUsersUseCaseImpl } from '@/src/server-container';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import UserDto from '../../../entities/users/user';

export async function getUserProfile() {
  const session = await getServerSession();
  GetUsersUseCaseImpl.firstName = session?.user?.name ?? undefined;
  GetUsersUseCaseImpl.lastName = undefined;
  GetUsersUseCaseImpl.id = undefined;

  const users = await GetUsersUseCaseImpl.handle();

  return users && users.length > 0 ? users.at(0)! : new UserDto();
}

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