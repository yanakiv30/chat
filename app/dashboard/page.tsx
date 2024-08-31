import { headers } from 'next/headers';
import App from "../_components/App";
import { fetchUsers } from '@/apiUtils/apiUsers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  headers(); 
  const users = await fetchUsers();
  return <App key="users-app" initialUsers={users} />;
}