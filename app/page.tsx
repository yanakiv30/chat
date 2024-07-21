// app/page.tsx
import { Metadata } from 'next';
//import HomePageContent from './HomePageContent';
//import { getUsers, getTeams } from '../services/apiGroups';
import HomePageContent from './_components/HomePageContent';
import { getTeams, getUsers } from './_services/apiGroups';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to chatSPA',
};

export default async function HomePage() {
  const users = await getUsers();
  const teams = await getTeams(+loggedInUser.id); // Replace 1 with appropriate user ID

  // Simulate fetching logged-in user and other state details
  const loggedInUser = { id: 1, name: 'User' };
  const isLoading = false;
  const isRegister = false;

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <HomePageContent 
        loggedInUser={loggedInUser}
        teams={teams}
        users={users}
        isLoading={isLoading}
        isRegister={isRegister}
      />
    </div>
  );
}
