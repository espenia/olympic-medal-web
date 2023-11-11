import { Session } from 'next-auth';
import Navbar from './navbar';
import NavbarItem from './navbar-item';

export default async function Nav({navigation, session} : {navigation : NavbarItem[], session: Session | null}) {
  return <Navbar user={session?.user} navigation={navigation} />;
}
