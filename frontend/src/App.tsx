import React, {useEffect } from 'react';
import './App.css'

import { PageRouter } from '@/routes/PageRouter.tsx';
import { useUserStore } from '@/store';
import { BACKEND_URL } from '@/utils';
import ImagePreloader from './components/ImagePreloader/ImagePreloader';


const App: React.FC = () => {
  const { getToken, getUser, userToken } = useUserStore((state) => state);

  // async function claim() {
  //   const response = await axios.post(`${BACKEND_URL}/users/claim/`, null, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: userToken,
  //     },
  //   });

  //   console.log(response.data);
  // }

async function waitToken(telegramData: TgUserData) {
  // telegramData = {
  //   "query_id": "AAFzSaYZAAAAAHNJphlLmx7a",
  //   "user": {
  //     "id": 430328179,
  //     "first_name": "Влад",
  //     "last_name": "",
  //     "username": "fixervlad",
  //     "language_code": "ru",
  //     "allows_write_to_pm": true,
  //     "photo_url": "https://t.me/i/userpic/320/7iZ137LU-Vh69UbTw0md7kZlXN0xACLJyhq7JQtktfQ.svg"
  //   },
  //   "auth_date": "1732833596",
  //   "signature": "7gFsk8nk6rmA__oF2W9gDuSTDgSDmR9jiHMA8g1QnZBpBoR1R2vCOsBiHOYndh1Klz6KoTqD18pgsPXy9FP3Cg",
  //   "hash": "7fd3681ca43c977a77d06628af72f2fd978aaa2de931b11023bb4483fd954d26"
  // }
  await getToken(telegramData);
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
      <ImagePreloader/>
      {userToken && <PageRouter />}
    </div>
  );
};

export default App;