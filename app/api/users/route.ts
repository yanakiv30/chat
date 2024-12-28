export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { Pool } from "@neondatabase/serverless";
const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
});

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT username, id, avatar, status, created_at FROM users"
    );
    return NextResponse.json(result.rows); 
  } catch (error) {
    return NextResponse.json(
      { error: "Users could not be loaded" },
      { status: 500 }
    );
  }
}