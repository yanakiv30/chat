// import { supabase } from "@/app/_services/supabase";
// import { NextRequest, NextResponse } from "next/server";
// import { Pool } from "@neondatabase/serverless";
// const pool = new Pool({
//   connectionString: process.env.NEON_DATABASE_URL,
// });
// const rateLimitStore = new Map<string, number>();
// export async function POST(request: NextRequest) {  
//   const ip = request.headers.get('x-forwarded-for') || 'unknown';
//   const now = Date.now();
//   const lastRequest = rateLimitStore.get(ip) || 0;
  
//   if (now - lastRequest < 2000) { // 2000=2 seconds
//       return new Response('Too Many Requests', { status: 429 });
//   }  
//   rateLimitStore.set(ip, now);
  
//   // try {
//   //   const newUser = await request.json();

//   //   if (!newUser) {
//   //     return NextResponse.json(
//   //       { error: "User data is required" },
//   //       { status: 400 }
//   //     );
//   //   }

//   //   const { data, error } = await supabase
//   //     .from("users")
//   //     .insert([newUser])
//   //     .select();

//   //   return NextResponse.json({ data, error });
//   // } catch (error) {
//   //   console.error("Error in insertNewUser:", error);
//   //   return NextResponse.json({ error: "An error occurred" }, { status: 500 });
//   // }

//   try {
//     const newUser = await request.json();

//     if (!newUser) {
//       return NextResponse.json(
//         { error: "User data is required" },
//         { status: 400 }
//       );
//     }

//     // Get the keys and values from newUser object
//     const keys = Object.keys(newUser);
//     const values = Object.values(newUser);
//     const placeholders = keys.map((_, i) => `$${i + 1}`).join(',');

//     const result = await pool.query(
//       `INSERT INTO users (${keys.join(',')}) 
//        VALUES (${placeholders}) 
//        RETURNING username, id, avatar, status, created_at`,
//       values
//     );

//     return NextResponse.json({ 
//       data: result.rows,
//       error: null 
//     });

//   } catch (error) {
//     console.error("Error in insertNewUser:", error);
//     return NextResponse.json(
//       { error: "An error occurred" },
//       { status: 500 }
//     );
//   }



// }
