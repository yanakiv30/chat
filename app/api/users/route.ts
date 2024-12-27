export const dynamic = "force-dynamic";

import { supabase } from "@/app/_services/supabase";
import { NextResponse } from "next/server";

import { Pool } from "@neondatabase/serverless";

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
});

// export async function fetchUsersNeon() {
//   try {
//     const result = await pool.query(
//       'SELECT username, id, avatar, status, created_at FROM users'
//     );
//     return result.rows;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw new Error("Failed to fetch users from Neon");
//   }
// }

// export async function GET() {
//   try {
//     const { data, error } = await supabase
//       .from("users")
//       .select("username,id,avatar,status,created_at");

//     if (error) {
//       console.error(error);
//       return NextResponse.json(
//         { error: "Users could not be loaded" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Error in getUsers:", error);
//     return NextResponse.json({ error: "An error occurred" }, { status: 500 });
//   }
// }

// export async function GET() {
//   try {
//     const result = await pool.query(
//       "SELECT username, id, avatar, status, created_at FROM users"
//     );
//     console.log("result = ", result);
//     return result.rows;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw new Error("Failed to fetch users from Neon");
//   }
// }



export async function GET() {
  try {
    const result = await pool.query(
      "SELECT username, id, avatar, status, created_at FROM users"
    );
    return NextResponse.json(result.rows); // Already matches as both return array of user objects
  } catch (error) {
    return NextResponse.json(
      { error: "Users could not be loaded" },
      { status: 500 }
    );
  }
}