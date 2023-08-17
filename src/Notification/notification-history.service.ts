// notification-history.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationHistoryService {
  private history: string[] = [];

  addNotification(message: string): void {
    this.history.push(message);
  }

  getHistory(): string[] {
    return this.history;
  }
}