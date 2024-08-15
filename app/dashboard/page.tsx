
import { headers } from 'next/headers';
import App from "../_components/App";
import { getUsers } from "../_services/apiGroups";

type UserSup = {
  username: string;
  id: number;
  avatar: string;
  status: string;
  created_at: string;
};

async function getData(): Promise<{ users: UserSup[] }> {  
  headers();
  const users = await getUsers();
  return { users };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function Page() {
  const { users } = await getData();
  console.log("users=", users);
  
  const now = Date.now();
  return <App key={now} initialUsers={users} />;
}

export default Page;