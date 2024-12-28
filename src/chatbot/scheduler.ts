import { CronJob } from 'cron';
import { MessageService } from './messageService';

export class MessageScheduler {
  private job: CronJob;

  constructor() {
    // Run every 5 days at 10:00 AM
    this.job = new CronJob('0 10 */5 * *', async () => {
      try {
        await MessageService.sendMessage();
        console.log('Scheduled message sent successfully');
      } catch (error) {
        console.error('Error in scheduled message:', error);
      }
    });
  }

  start(): void {
    this.job.start();
    console.log('Message scheduler started');
  }

  stop(): void {
    this.job.stop();
    console.log('Message scheduler stopped');
  }
}