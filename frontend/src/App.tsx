import axios from 'axios';
import React, { useEffect } from 'react';

import { PageRouter } from '@/routes/PageRouter.tsx';
import { useUserStore } from '@/store';
import { BACKEND_URL } from '@/utils';

// Интерфейс для данных Telegram
interface TgUserData {
  query_id: string;
  user: {
    id: number;
    first_name: string;
    last_name?: string;
    username: string;
    language_code: string;
    allows_write_to_pm: boolean;
  };
  auth_date: number; // Изменено на number
  hash: string;
  start_param: string;
  chat_instance: string;
  chat_type: string;
}

const App: React.FC = () => {
  const { getToken, getUser, userToken } = useUserStore((state) => state);

  async function claim() {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/claim/`, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error during claim:', error);
    }
  }

  async function waitToken(telegramData: TgUserData) {
    try {
      await getToken(telegramData);
      await claim();
      await getUser();
    } catch (error) {
      console.error('Error during waitToken:', error);
    }
  }

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg && tg.initDataUnsafe) {
      tg.ready();
      tg.expand();
      const {
        query_id,
        user,
        auth_date,
        hash,
        start_param,
        chat_instance,
        chat_type,
      } = tg.initDataUnsafe;

      const telegramData: TgUserData = {
        query_id,
        user,
        auth_date: parseInt(auth_date, 10), // Преобразование строки в число
        hash,
        start_param,
        chat_instance,
        chat_type,
      };

      console.log(telegramData);

      waitToken(telegramData);
    }
  }, []);

  console.log('Backend URL:', BACKEND_URL);

  return (
    <div>
      <PageRouter />
    </div>
  );
};

export default App;
