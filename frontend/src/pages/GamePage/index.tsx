import axios from 'axios';
import { useEffect, useState } from 'react';

import { Game } from '@/components';
import { useUserStore } from '@/store';
import { BACKEND_URL } from '@/utils';

export function GamePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState<IGame | null>(null);
  const { userToken } = useUserStore();

  // Функция для получения данных игры с сервера
  async function getGame() {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/users/game/`,
        {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: userToken,
          },
        },
      );

      console.log('@Game', response.data);
      setGameData(response.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getGame();
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!gameData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Game gameData={gameData} />
    </div>
  );
}

// const [gameResponseData, setGameResponseData] = useState({
//   clicked: [
//     {
//       level: 1,
//       time: 30,
//       data: [
//         { coin: { type: 'good', x: 123, y: 132 }, stage: 1 },
//         { coin: { type: 'good', x: 123, y: 132 }, stage: 2 },
//         { coin: { type: 'good', x: 123, y: 132 }, stage: 3 },
//       ],
//     },
//     {
//       level: 2,
//       time: 30,
//       data: [
//         { coin: { type: 'good', x: 123, y: 132 }, stage: 1 },
//         { coin: { type: 'good', x: 123, y: 132 }, stage: 2 },
//         { coin: { type: 'good', x: 123, y: 132 }, stage: 3 },
//       ],
//     },
//   ],
// });
//
// function responseToGame() {
//   const data = [];
//   const level = {level: 1, time: 30, data: []};
// }

// async function endGame() {
//   const response = axios.post(
//     `${BACKEND_URL}/users/game/${gameData?.uuid}`,
//     null,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: userToken,
//       },
//     },
//   );
// }
