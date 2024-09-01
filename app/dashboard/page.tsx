import { headers } from 'next/headers';
import App from "../_components/App";
import { fetchUsersServer } from '@/apiUtils/apiUsersServer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  headers(); 
  const users = await fetchUsersServer();
  return <App key="users-app" initialUsers={users} />;
}