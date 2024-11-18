import axios from 'axios';
import React, {useEffect } from 'react';

import { PageRouter } from '@/routes/PageRouter.tsx';
import { useUserStore } from '@/store';
import { BACKEND_URL } from '@/utils';


const App: React.FC = () => {
  const { getToken, getUser, userToken } = useUserStore((state) => state);

  async function claim() {
    const response = await axios.post(`${BACKEND_URL}/users/claim/`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    });

    console.log(response.data);
  }

async function waitToken(telegramData: TgUserData) {
  await getToken(telegramData);
  claim();
  getUser();
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
        auth_date,
        start_param,
        hash,
        chat_instance,
        chat_type,
      };

      console.log(telegramData);

      waitToken(telegramData);
    }
  }, []);

  console.log(BACKEND_URL);

  return (
    <div>
      <PageRouter />
    </div>
  );
};

export default App;