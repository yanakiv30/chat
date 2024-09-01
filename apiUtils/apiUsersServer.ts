import { headers } from "next/headers";

export async function fetchUsersServer() {
  const host = headers().get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const fullUrl = `${protocol}://${host}/api/users`;

  const response = await fetch(fullUrl);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}