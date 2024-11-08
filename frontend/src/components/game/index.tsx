// import '@styles/Game.scss';
//
// import falsee from '@images/false.png';
// import truee from '@images/true.png';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
//
// import { BACKEND_URL } from '@/utils';
//
// interface CircleProps {
//   isGreen: boolean;
//   onClick: () => void;
//   position: { top: number; left: number };
// }
//
// // Компонент для отображения круга (монеты)
// const Circle: React.FC<CircleProps> = ({ isGreen, onClick, position }) => {
//   const [animate, setAnimate] = useState(false);
//
//   useEffect(() => {
//     setAnimate(true);
//     const timer = setTimeout(() => setAnimate(false), 300);
//     return () => clearTimeout(timer);
//   }, [position, isGreen]);
//
//   return (
//     <img
//       src={isGreen ? truee : falsee}
//       onClick={onClick}
//       className={`circle-image ${animate ? 'animate' : ''}`}
//       style={{
//         top: `${position.top}px`,
//         left: `${position.left}px`,
//         width: '50px',
//         height: '50px',
//         position: 'absolute',
//         cursor: 'pointer',
//       }}
//       alt={isGreen ? 'Green Coin' : 'Wrong Coin'}
//     />
//   );
// };
//
// // Добавим интерфейс для данных кликов
// interface ClickData {
//   isGreen: boolean; // Тип клика (правильный или неправильный)
//   levelIndex: number; // Индекс уровня
//   stageIndex: number; // Индекс стадии
//   timeLeft: number; // Оставшееся время на уровне
//   timestamp: number; // Время клика
// }
//
// export const Game: React.FC<{ gameData: IGame }> = ({ gameData }) => {
//   const [levelIndex, setLevelIndex] = useState(0); // Текущий уровень
//   const [stageIndex, setStageIndex] = useState(0); // Текущая стадия
//   const [timeLeft, setTimeLeft] = useState(100); // Таймер для уровня
//   const [gameOver, setGameOver] = useState(false); // Состояние завершения игры
//   const [levelComplete, setLevelComplete] = useState(false); // Завершение уровня
//   const [circles, setCircles] = useState<React.ReactNode[]>([]); // Рендеримые круги
//   const [countdown, setCountdown] = useState<number | null>(3); // Обратный отсчет перед началом
//   const [clickData, setClickData] = useState<ClickData[]>([]); // Данные о кликах
//
//   // Получаем текущий уровень и стадию из данных игры
//   const currentLevel = gameData.generated[levelIndex];
//   const currentStageData = currentLevel.data[stageIndex];
//
//   // Обработка клика по зеленой монете
//   const handleGreenClick = () => {
//     const newClickData: ClickData = {
//       isGreen: true,
//       levelIndex,
//       stageIndex,
//       timeLeft,
//       timestamp: Date.now(),
//     };
//     setClickData((prev) => [...prev, newClickData]); // Сохраняем данные клика
//     if (stageIndex < currentLevel.data.length - 1) {
//       setStageIndex(stageIndex + 1); // Переход на следующую стадию
//     } else if (levelIndex < gameData.generated.length - 1) {
//       setLevelComplete(true); // Уровень завершен
//     } else {
//       setGameOver(true); // Игра завершена
//       sendClickData(); // Отправляем данные при завершении игры
//     }
//   };
//
//   // Обработка клика по неправильной монете
//   const handleWrongClick = () => {
//     const newClickData: ClickData = {
//       isGreen: false,
//       levelIndex,
//       stageIndex,
//       timeLeft,
//       timestamp: Date.now(),
//     };
//     setClickData((prev) => [...prev, newClickData]); // Сохраняем данные клика
//     setGameOver(true); // Игра завершена
//     sendClickData(); // Отправляем данные при завершении игры
//   };
//
//   // Функция для отправки данных на сервер
//   const sendClickData = async () => {
//     // try {
//     //   await axios.post(
//     //     `${BACKEND_URL}/users/game/track-clicks`,
//     //     {
//     //       clicks: clickData,
//     //     },
//     //     {
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //         Authorization: userToken,
//     //       },
//     //     },
//     //   );
//     //   console.log('Click data sent successfully:', clickData);
//     // } catch (error) {
//     //   console.error('Error sending click data:', error);
//     // }
//
//     console.log({ clicks: clickData });
//   };
//
//   const renderCircles = () => {
//     const circlesArray = currentStageData.coins.map((coin, index) => {
//       const position = { top: coin.y, left: coin.x }; // Позиция монеты
//       return (
//         <Circle
//           key={`${index}-${coin.x}-${coin.y}-${coin.type}`}
//           isGreen={coin.type === 'good'}
//           onClick={coin.type === 'good' ? handleGreenClick : handleWrongClick}
//           position={position}
//         />
//       );
//     });
//     setCircles(circlesArray); // Обновляем состояние с кругами для рендеринга
//   };
//
//   // Ререндер кругов при изменении стадии или обратного отсчета
//   useEffect(() => {
//     if (countdown === null) {
//       renderCircles();
//     }
//   }, [stageIndex, countdown]);
//
//   // Таймер для уровня (уменьшение времени)
//   useEffect(() => {
//     if (timeLeft > 0 && !gameOver && !levelComplete && countdown === null) {
//       const interval = setInterval(() => {
//         setTimeLeft((prev) => prev - 1);
//       }, 1000); // Уменьшаем время каждую секунду
//
//       return () => clearInterval(interval); // Очищаем таймер
//     } else if (timeLeft <= 0 && !gameOver) {
//       setGameOver(true); // Завершаем игру, если время истекло
//       sendClickData(); // Отправляем данные при истечении времени
//     }
//   }, [timeLeft, gameOver, levelComplete, countdown]);
//
//   // Обратный отсчет перед началом уровня/стадии
//   useEffect(() => {
//     startCountdown();
//   }, []);
//
//   // Функция для начала обратного отсчета
//   const startCountdown = () => {
//     setCountdown(3); // Начальное значение обратного отсчета
//     const interval = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev === 1) {
//           clearInterval(interval); // Очищаем таймер, когда обратный отсчет завершен
//           setCountdown(null); // Сбрасываем обратный отсчет, чтобы начать игру
//         }
//         return prev !== null ? prev - 1 : null;
//       });
//     }, 1000); // Обратный отсчет каждую секунду
//   };
//
//   // Переход на следующий уровень
//   const handleNextLevel = () => {
//     setLevelIndex(levelIndex + 1); // Переход на следующий уровень
//     setStageIndex(0); // Начинаем с первой стадии нового уровня
//     setTimeLeft(gameData.generated[levelIndex + 1].time); // Сбрасываем таймер на время следующего уровня
//     setLevelComplete(false); // Сбрасываем флаг завершения уровня
//     startCountdown(); // Запускаем обратный отсчет
//   };
//
//   // Функция для повторной попытки после завершения игры
//   const handleTryAgain = () => {
//     setLevelIndex(0); // Сбрасываем до первого уровня
//     setStageIndex(0); // Сбрасываем до первой стадии
//     setTimeLeft(gameData.generated[0].time); // Таймер для первого уровня
//     setGameOver(false); // Сбрасываем флаг завершения игры
//     setClickData([]); // Сбрасываем данные кликов
//     startCountdown(); // Запуск обратного отсчета
//   };
//
//   // Классы для контейнера игры
//   const gameContainerClass =
//     countdown !== null ? 'game-container' : 'game-container game-active';
//
//   return (
//     <div className={gameContainerClass}>
//       {gameOver ? (
//         <div className='game-over'>
//           <h1>GAME OVER</h1>
//           <div className='game-over-buttons'>
//             <button className='again' onClick={handleTryAgain}>
//               Try Again
//             </button>
//             <NavLink to='/' className='exit'>
//               Exit
//             </NavLink>
//           </div>
//         </div>
//       ) : levelComplete ? (
//         <div className='level-complete-menu'>
//           <h1>Уровень {currentLevel.level} пройден!</h1>
//           <button onClick={handleNextLevel}>Продолжить</button>
//         </div>
//       ) : countdown !== null ? (
//         <div className='countdown'>{countdown}</div>
//       ) : (
//         <>
//           <div className='game-info'>
//             <div className='lvl'>
//               LVL: <span>{currentLevel.level}</span> /{' '}
//               {gameData.generated.length}
//             </div>
//           </div>
//           <div className='timer-bar'>
//             <div
//               className='timer-bar-fill'
//               style={{ width: `${(timeLeft / currentLevel.time) * 100}%` }}
//             />
//           </div>
//           <div style={{ position: 'relative', width: '100%', height: '100%' }}>
//             {circles}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

import '@styles/Game.scss';

import falsee from '@images/false.png';
import truee from '@images/true.png';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface CircleProps {
  isGreen: boolean;
  onClick: () => void;
  position: { top: number; left: number };
}

// Компонент для отображения круга (монеты)
const Circle: React.FC<CircleProps> = ({ isGreen, onClick, position }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [position, isGreen]);

  return (
    <img
      src={isGreen ? truee : falsee}
      onClick={onClick}
      className={`circle-image ${animate ? 'animate' : ''}`}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: '50px',
        height: '50px',
        position: 'absolute',
        cursor: 'pointer',
      }}
      alt={isGreen ? 'Green Coin' : 'Wrong Coin'}
    />
  );
};

// Интерфейс для данных кликов с координатами
interface ClickData {
  isGreen: boolean; // Тип клика (правильный или неправильный)
  levelIndex: number; // Индекс уровня
  stageIndex: number; // Индекс стадии
  timeLeft: number; // Оставшееся время на уровне
  timestamp: number; // Время клика
  coinX: number; // Координата X нажатой монеты
  coinY: number; // Координата Y нажатой монеты
}

export const Game: React.FC<{ gameData: IGame }> = ({ gameData }) => {
  const [levelIndex, setLevelIndex] = useState(0); // Текущий уровень
  const [stageIndex, setStageIndex] = useState(0); // Текущая стадия
  const [timeLeft, setTimeLeft] = useState(100); // Таймер для уровня
  const [gameOver, setGameOver] = useState(false); // Состояние завершения игры
  const [levelComplete, setLevelComplete] = useState(false); // Завершение уровня
  const [circles, setCircles] = useState<React.ReactNode[]>([]); // Рендеримые круги
  const [countdown, setCountdown] = useState<number | null>(3); // Обратный отсчет перед началом
  const [clickData, setClickData] = useState<ClickData[]>([]); // Данные о кликах

  // Получаем текущий уровень и стадию из данных игры
  const currentLevel = gameData.generated[levelIndex];
  const currentStageData = currentLevel.data[stageIndex];

  // Обработка клика по зеленой монете
  const handleGreenClick = (coinX: number, coinY: number) => {
    const newClickData: ClickData = {
      isGreen: true,
      levelIndex,
      stageIndex,
      timeLeft,
      timestamp: Date.now(),
      coinX, // Добавляем координаты
      coinY, // Добавляем координаты
    };
    setClickData((prev) => [...prev, newClickData]); // Сохраняем данные клика
    if (stageIndex < currentLevel.data.length - 1) {
      setStageIndex(stageIndex + 1); // Переход на следующую стадию
    } else if (levelIndex < gameData.generated.length - 1) {
      setLevelComplete(true); // Уровень завершен
    } else {
      setGameOver(true); // Игра завершена
      sendClickData(); // Отправляем данные при завершении игры
    }
  };

  // Обработка клика по неправильной монете
  const handleWrongClick = (coinX: number, coinY: number) => {
    const newClickData: ClickData = {
      isGreen: false,
      levelIndex,
      stageIndex,
      timeLeft,
      timestamp: Date.now(),
      coinX, // Добавляем координаты
      coinY, // Добавляем координаты
    };
    setClickData((prev) => [...prev, newClickData]); // Сохраняем данные клика
    setGameOver(true); // Игра завершена
    sendClickData(); // Отправляем данные при завершении игры
  };

  // Функция для отправки данных на сервер
  const sendClickData = async () => {
    // try {
    //   await axios.post(
    //     `${BACKEND_URL}/users/game/track-clicks`,
    //     {
    //       clicks: clickData,
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: userToken,
    //       },
    //     },
    //   );
    //   console.log('Click data sent successfully:', clickData);
    // } catch (error) {
    //   console.error('Error sending click data:', error);
    // }
    console.log({ clicks: clickData });
  };

  const renderCircles = () => {
    const circlesArray = currentStageData.coins.map((coin, index) => {
      const position = { top: coin.y, left: coin.x }; // Позиция монеты
      return (
        <Circle
          key={`${index}-${coin.x}-${coin.y}-${coin.type}`}
          isGreen={coin.type === 'good'}
          onClick={
            coin.type === 'good'
              ? () => handleGreenClick(coin.x, coin.y)
              : () => handleWrongClick(coin.x, coin.y)
          }
          position={position}
        />
      );
    });
    setCircles(circlesArray); // Обновляем состояние с кругами для рендеринга
  };

  // Ререндер кругов при изменении стадии или обратного отсчета
  useEffect(() => {
    if (countdown === null) {
      renderCircles();
    }
  }, [stageIndex, countdown]);

  // Таймер для уровня (уменьшение времени)
  useEffect(() => {
    if (timeLeft > 0 && !gameOver && !levelComplete && countdown === null) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000); // Уменьшаем время каждую секунду

      return () => clearInterval(interval); // Очищаем таймер
    } else if (timeLeft <= 0 && !gameOver) {
      setGameOver(true); // Завершаем игру, если время истекло
      sendClickData(); // Отправляем данные при истечении времени
    }
  }, [timeLeft, gameOver, levelComplete, countdown]);

  // Обратный отсчет перед началом уровня/стадии
  useEffect(() => {
    startCountdown();
  }, []);

  // Функция для начала обратного отсчета
  const startCountdown = () => {
    setCountdown(3); // Начальное значение обратного отсчета
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval); // Очищаем таймер, когда обратный отсчет завершен
          setCountdown(null); // Сбрасываем обратный отсчет, чтобы начать игру
        }
        return prev !== null ? prev - 1 : null;
      });
    }, 1000); // Обратный отсчет каждую секунду
  };

  // Переход на следующий уровень
  const handleNextLevel = () => {
    setLevelIndex(levelIndex + 1); // Переход на следующий уровень
    setStageIndex(0); // Начинаем с первой стадии нового уровня
    setTimeLeft(gameData.generated[levelIndex + 1].time); // Сбрасываем таймер на время следующего уровня
    setLevelComplete(false); // Сбрасываем флаг завершения уровня
    startCountdown(); // Запускаем обратный отсчет
  };

  // Функция для повторной попытки после завершения игры
  const handleTryAgain = () => {
    setLevelIndex(0); // Сбрасываем до первого уровня
    setStageIndex(0); // Сбрасываем до первой стадии
    setTimeLeft(gameData.generated[0].time); // Таймер для первого уровня
    setGameOver(false); // Сбрасываем флаг завершения игры
    setClickData([]); // Сбрасываем данные кликов
    startCountdown(); // Запуск обратного отсчета
  };

  // Классы для контейнера игры
  const gameContainerClass =
    countdown !== null ? 'game-container' : 'game-container game-active';

  // Рендеринг компонента Game
  return (
    <div className={gameContainerClass}>
      <button onClick={() => console.log({ clicks: clickData })}>CLick</button>
      {gameOver ? (
        <div className='game-over'>
          <h1>GAME OVER</h1>
          <div className='game-over-buttons'>
            <button className='again' onClick={handleTryAgain}>
              Try Again
            </button>
            <NavLink to='/' className='exit'>
              Exit
            </NavLink>
          </div>
        </div>
      ) : levelComplete ? (
        <div className='level-complete-menu'>
          <h1>Уровень {currentLevel.level} пройден!</h1>
          <button onClick={handleNextLevel}>Продолжить</button>
        </div>
      ) : countdown !== null ? (
        <div className='countdown'>{countdown}</div>
      ) : (
        <>
          <div className='game-info'>
            <div className='lvl'>
              LVL: <span>{currentLevel.level}</span> /{' '}
              {gameData.generated.length}
            </div>
          </div>
          <div className='timer-bar'>
            <div
              className='timer-bar-fill'
              style={{ width: `${(timeLeft / currentLevel.time) * 100}%` }}
            />
          </div>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {circles}
          </div>
        </>
      )}
    </div>
  );
};
