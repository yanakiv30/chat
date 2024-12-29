// app/api/ping-db/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    // Изпращане на съобщение
    const { data, error } = await supabase
      .from('messages')  // или както се казва твоята таблица за съобщения
      .insert({
        message: 'Hello 👋',
        user_id: '360',  // ID на бот потребителя
        team_id: '702',      // ID на екипа       
        created_at: new Date().toISOString()
      })
      .select()
    
    if (error) throw error

    return NextResponse.json({
      status: 'ok',
      message: 'Hello message sent',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Message sending failed:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}