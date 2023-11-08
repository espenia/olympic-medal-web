import Navbar from './navbar';
import NavbarItem from './navbar-item';

import { getServerSession } from 'next-auth/next';

export default async function Nav({navigation} : {navigation : NavbarItem[]}) {
  const session = await getServerSession();
  return <Navbar user={session?.user} navigation={navigation} />;
}
