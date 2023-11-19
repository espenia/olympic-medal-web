
import { getUserProfile } from './actions';
import UserProfile from './component';

export default async function PerfilUsuario() {
  const user = await getUserProfile();

  return <UserProfile userProps={JSON.parse(JSON.stringify(user))}></UserProfile>;
};
