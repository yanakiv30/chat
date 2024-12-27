// export async function fetchUsers() {
//     const response = await fetch('http://localhost:3000/api/users');
//     if (!response.ok) {
//       throw new Error('Failed to fetch users');
//     }
//     return response.json();
//   }

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL
  
});

export async function fetchUsersNeon() {
  try {
    const result = await pool.query(
      'SELECT username, id, avatar, status, created_at FROM users'
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users from Neon");
  }
}


  export async function fetchUsersClient() {
    const response = await fetch('/api/users');
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  }

  

  export async function deleteUser() { 
    
    const response = await fetch("/api/users/delete", {
      method: "DELETE",     
    });  
    const result = await response.json();
  
    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete user');
    }  
    return result;
  }