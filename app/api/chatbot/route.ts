// import { NextResponse } from 'next/server';
// import { MessageScheduler } from '../../../chatbot/scheduler';

// let messageScheduler: MessageScheduler | null = null;

// export async function GET() {
//   try {
//     if (!messageScheduler) {
//       messageScheduler = new MessageScheduler();
//       messageScheduler.start();
//     }
    
//     return NextResponse.json({ status: 'ChatBot scheduler is running' });
//   } catch (error) {
//     console.error('Error starting chatbot:', error);
//     return NextResponse.json({ error: 'Failed to start chatbot' }, { status: 500 });
//   }
// }

// export async function POST() {
//   try {
//     if (messageScheduler) {
//       messageScheduler.stop();
//       messageScheduler = null;
//     }
    
//     return NextResponse.json({ status: 'ChatBot scheduler stopped' });
//   } catch (error) {
//     console.error('Error stopping chatbot:', error);
//     return NextResponse.json({ error: 'Failed to stop chatbot' }, { status: 500 });
//   }
// }

// app/api/ping-db/route.ts
// import { createClient } from '@supabase/supabase-js'
// import { NextResponse } from 'next/server'

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

// export async function GET() {
//   try {
//     // Изпращане на съобщение
//     const { data, error } = await supabase
//       .from('messages')  // или както се казва твоята таблица за съобщения
//       .insert({
//         message: 'Hello Crone 👋',
//         sender_id: '360',  // ID на бот потребителя
//         team_id: '702',      // ID на екипа       
//         created_at: new Date().toISOString()
//       })
//       .select()
    
//     if (error) throw error

//     return NextResponse.json({
//       status: 'ok',
//       message: 'Hello Crone message sentllllllllllll',
//       timestamp: new Date().toISOString()
//     })
//   } catch (error) {
//     console.error('Message sending failed:', error)
//     return NextResponse.json(
//       { error: 'Failed to send message' },
//       { status: 500 }
//     )
//   }
// }


import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Добавяме конфигурация за кеширане
export const dynamic = 'force-dynamic'
export const revalidate = 0

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        message: 'Hello Crone 👋',
        sender_id: '360',
        team_id: '702',      
        created_at: new Date().toISOString()
      })
      .select()
    
    if (error) throw error

    return NextResponse.json(
      {
        status: 'ok',
        message: 'Hello Crone message sentllllllllllll',
        timestamp: new Date().toISOString()
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0'
        }
      }
    )
  } catch (error) {
    console.error('Message sending failed:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}