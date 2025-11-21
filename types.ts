export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface UsageStats {
  dailyLimit: number;
  used: number;
  remaining: number;
}

export interface TierInfo {
  name: string;
  rpm: number; // Requests per minute
  rpd: number; // Requests per day
  tpm: number; // Tokens per minute
  desc: string;
}