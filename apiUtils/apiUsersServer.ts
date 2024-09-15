import { headers } from "next/headers";

// Helper function to get the base URL
function getBaseUrl() {
  const host = headers().get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  return `${protocol}://${host}`;
}

// Fetch all users
export async function fetchUsers() {
  const fullUrl = `${getBaseUrl()}/api/users`;

  const response = await fetch(fullUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

// Fetch a user by email
export async function fetchUserByEmail(email: string) {
  const fullUrl = `${getBaseUrl()}/api/users/fetch-by-email`;

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  return {
    existingUser: result.data,
    fetchError: result.error,
  };
}

// Insert a new user
export async function insertNewUser(newUser: any) {
  const fullUrl = `${getBaseUrl()}/api/users/insert`;

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const result = await response.json();

  return {
    data: result.data,
    error: result.error,
  };
}
