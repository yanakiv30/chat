import { supabase } from "@/app/_services/supabase";
import { Pool } from "@neondatabase/serverless";
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
});

// export async function fetchUsers() {
//   try {
//     const { data, error } = await supabase
//       .from("users")
//       .select("username,id,avatar,status,created_at");

//     if (error) {
//       console.error("Error fetching users:", error);
//       throw new Error("Failed to fetch users");
//     }

//     return data;
//   } catch (error) {
//     console.error("Unexpected error in fetchUsers:", error);
//     throw error;
//   }
// }

// Fetch a user by email
export async function fetchUserByEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    return {
      existingUser: data,
      fetchError: error,
    };
  } catch (unexpectedError) {
    console.error("Unexpected error in fetchUserByEmail:", unexpectedError);
    return {
      existingUser: null,
      fetchError: {
        message: "An unexpected error occurred",
        details:
          unexpectedError instanceof Error
            ? unexpectedError.message
            : String(unexpectedError),
      },
    };
  }
}

// Insert a new user
// export async function insertNewUser(newUser: any) {
//   try {
//     const { data, error } = await supabase
//       .from("users")
//       .insert([newUser])
//       .select();

//     return {
//       data: data,
//       error: error,
//     };
//   } catch (unexpectedError) {
//     console.error("Unexpected error in insertNewUser:", unexpectedError);
//     return {
//       data: null,
//       error: {
//         message: "An unexpected error occurred",
//         details:
//           unexpectedError instanceof Error
//             ? unexpectedError.message
//             : String(unexpectedError),
//       },
//     };
//   }
// }
export async function insertNewUser(newUser: any) {
  try {
    const keys = Object.keys(newUser);
    const values = Object.values(newUser);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(',');
 
    const result = await pool.query(
      `INSERT INTO users (${keys.join(',')}) 
       VALUES (${placeholders}) 
       RETURNING username, id, avatar, status, created_at`,
      values
    );
 
    return {
      data: result.rows,
      error: null
    };
 
  } catch (unexpectedError) {
    console.error("Unexpected error in insertNewUser:", unexpectedError);
    return {
      data: null,
      error: {
        message: "An unexpected error occurred",
        details: unexpectedError instanceof Error 
          ? unexpectedError.message 
          : String(unexpectedError)
      }
    };
  }
 }

