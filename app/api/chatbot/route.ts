import { NextResponse } from 'next/server';
import { MessageScheduler } from '../../../chatbot/scheduler';

let messageScheduler: MessageScheduler | null = null;

export async function GET() {
  try {
    if (!messageScheduler) {
      messageScheduler = new MessageScheduler();
      messageScheduler.start();
    }
    
    return NextResponse.json({ status: 'ChatBot scheduler is running' });
  } catch (error) {
    console.error('Error starting chatbot:', error);
    return NextResponse.json({ error: 'Failed to start chatbot' }, { status: 500 });
  }
}

export async function POST() {
  try {
    if (messageScheduler) {
      messageScheduler.stop();
      messageScheduler = null;
    }
    
    return NextResponse.json({ status: 'ChatBot scheduler stopped' });
  } catch (error) {
    console.error('Error stopping chatbot:', error);
    return NextResponse.json({ error: 'Failed to stop chatbot' }, { status: 500 });
  }
}