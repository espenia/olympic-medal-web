import Navbar from './navbar';
import NavbarItem from './navbar-item';
import { Session } from 'next-auth';

// import { getServerSession } from 'next-auth/next';

export default async function Nav({navigation, session} : {navigation : NavbarItem[], session: Session | null}) {
  // const session = await getServerSession();
  return <Navbar user={session?.user} navigation={navigation} />;
}
