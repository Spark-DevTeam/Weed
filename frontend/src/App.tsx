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
    let data = {"query_id":"AAG5g6VPAAAAALmDpU-kDIS3","user":{"id":1336247225,"first_name":"Huden","last_name":"","username":"Hudeeen","language_code":"ru","allows_write_to_pm":true},"auth_date":"1731426541","hash":"b5a472f0265a202138ec8a4ef7a8a4d4e79479ba2f5ee0b7a700ab4412df4b1a"}
    await getToken(data);
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

  // async function getDaily() {
  //   console.log('@', userToken);
  //   const response = await axios.post(
  //     'BACKEND_URL/users/claim/',
  //     null,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: userToken,
  //       },
  //     },
  //   );
  //
  //   console.log(response.data);
  // }

  // async function getGame() {
  //   const response = await axios.post(
  //     'BACKEND_URL/users/game/',
  //     {
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     },
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: userToken,
  //       },
  //     },
  //   );
  //
  //   console.log(response.data);
  // }

  // function onClickHandler(event: MouseEvent<HTMLButtonElement>) {
  //   // getDaily()
  //   getGame();
  //   // console.log(window.innerWidth, window.innerHeight);
  // }

  return (
    <div>
      {/*<button onClick={onClickHandler}>Click</button>*/}
      <PageRouter />
    </div>
  );
};

export default App;

//referal
// t.me/@bot_name?start=user.code
