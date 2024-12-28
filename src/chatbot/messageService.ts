import { supabase } from './supabase';
import { CHATBOT_CONFIG } from './config';
import { Message } from './types';

export class MessageService {
  static async sendMessage(content: string = CHATBOT_CONFIG.DEFAULT_MESSAGE): Promise<void> {
    const message: Message = {
      content,
      team_id: CHATBOT_CONFIG.TEAM_ID,
      user_id: CHATBOT_CONFIG.USER_ID,
    };

    const { error } = await supabase
      .from('messages')
      .insert(message);

    if (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}
