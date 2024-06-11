import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogsActivityService {
  private logs: any[] = [];
  private currentLog: any = null;
  private startTime: number;
  private readonly LOG_STORAGE_KEY = 'app_logs';
  private readonly LAST_SEND_KEY = 'last_send_date';

  constructor(private http: HttpClient) {
    this.loadLogs();
  }

  startLogging(page: string) {
    this.startTime = Date.now();
    this.currentLog = {
      page: page,
      duration: 0,
      start: new Date().toLocaleString(),
      events: []
    };
  }

  logEvent(eventType: string, eventName: string) {
    if (this.currentLog) {
      this.currentLog.events.push({ type: eventType, name: eventName });
    }
  }

  stopLogging() {
    if (this.currentLog) {
      this.currentLog.duration = (Date.now() - this.startTime) / 1000; // duración en segundos
      this.logs.push(this.currentLog);
      this.currentLog = null;
      this.saveLogs();
    }
  }

  getLogs() {
    return this.logs;
  }

  private saveLogs() {
    localStorage.setItem(this.LOG_STORAGE_KEY, JSON.stringify(this.logs));
  }

  private loadLogs() {
    const storedLogs = localStorage.getItem(this.LOG_STORAGE_KEY);
    if (storedLogs) {
      this.logs = JSON.parse(storedLogs);
    }
  }

  private saveLastSendDate() {
    localStorage.setItem(this.LAST_SEND_KEY, new Date().toISOString());
  }

  private loadLastSendDate(): Date | null {
    const lastSend = localStorage.getItem(this.LAST_SEND_KEY);
    return lastSend ? new Date(lastSend) : null;
  }

  private shouldSendLogs(): boolean {
    const lastSendDate = this.loadLastSendDate();
    if (!lastSendDate) {
      return true;
    }
    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    return (now.getTime() - lastSendDate.getTime()) > oneDay;
  }

  sendLogsToApi() {
    if (this.shouldSendLogs() && this.logs.length > 0) {
      this.http.post('https://your-api-endpoint.com/logs', this.logs).subscribe({
        next: () => {
          this.logs = [];
          this.saveLogs();
          this.saveLastSendDate();
        },
        error: (error) => {
          console.error('Failed to send logs:', error);
        }
      });
    }
  }

  getTotalDuration(): number {
    return this.logs.reduce((total, log) => total + log.duration, 0);
  }

  getPageVisits(): { [page: string]: number } {
    const pageVisits: { [page: string]: number } = {};
    this.logs.forEach(log => {
      pageVisits[log.page] = (pageVisits[log.page] || 0) + 1;
    });
    return pageVisits;
  }

  countEventsOfType(eventType: string): number {
    let count = 0;
    this.logs.forEach(log => {
      count += log.events.filter(event => event.type === eventType).length;
    });
    return count;
  }

}
