// src/@types/telegram.d.ts
interface TgUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  }
  
  interface TgUserData {
    query_id: string;
    user: TgUser;
    auth_date: number;
    hash: string;
    start_param: string;
    chat_instance: string;
    chat_type: string;
  }
  
  interface TelegramWebApp {
    initDataUnsafe?: {
      query_id: string;
      user: TgUser;
      auth_date: number;
      hash: string;
      start_param: string;
      chat_instance: string;
      chat_type: string;
    };
    ready: () => void;
    expand: () => void;
  }
  
  declare global {
    interface Window {
      Telegram?: {
        WebApp: TelegramWebApp;
      };
    }
  }
  