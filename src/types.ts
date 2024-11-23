export interface Chat {
  id: string;
  startTime: Date;
  duration: number;
  status: 'active' | 'ended';
  service?: string;
  caller?: string;
  media?: string;
}

export interface User {
  username: string;
  maxChats: number;
  connected: boolean;
}

export interface ServerError {
  username?: string;
  maxCalls?: number;
  error: string;
}