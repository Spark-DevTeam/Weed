import '@styles/Game.scss';

import truee from '@images/true.png';
import React, { useEffect,  useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';
import { useUserStore } from '@/store';
import bomeLogo from '@images/game/bome-logo.svg';
import bonkLogo from '@images/game/bonk-logo.svg';
import brettLogo from '@images/game/brett-logo.svg';
import dogeCoinLogo from '@images/game/dogecoin-doge-logo.svg';
import dogsLogo from '@images/game/dogs-logo.svg';
import pepeLogo from '@images/game/pepe-logo.svg';
import ponkeLogo from '@images/game/ponke-logo.svg';

interface CircleProps {
  isGreen: boolean;
  onClick: () => void;
  position: { top: number; left: number };
  image?: string;
}

// Компонент для отображения круга (монеты)
const Circle: React.FC<CircleProps> = ({ isGreen, image, onClick, position }) => {
  const [animate, setAnimate] = useState(false);
  

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [position, isGreen]);

  return (
    <img
      src={isGreen ? truee : image}
      onClick={onClick}
      className={`circle-image ${animate ? 'animate' : ''}`}
      style={{
        top: `${position.top - 100 > 50 ? position.top - 100 : 50}px`,
        left: `${position.left - 50 > 0 ? position.left - 50 : 0}px`,
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
  timestamp: any; // Время клика
  coinX: number; // Координата X нажатой монеты
  coinY: number; // Координата Y нажатой монеты
}

export const Game: React.FC<{ gameData: IGame }> = ({ gameData }) => {
  const [levelIndex, setLevelIndex] = useState(0); // Текущий уровень
  const [stageIndex, setStageIndex] = useState(0); // Текущая стадия
  const [timeLeft, setTimeLeft] = useState(gameData.generated[0].time); // Таймер для уровня
  const [gameOver, setGameOver] = useState(false); // Состояние завершения игры
  const [levelComplete, setLevelComplete] = useState(false); // Завершение уровня
  const [circles, setCircles] = useState<React.ReactNode[]>([]); // Рендеримые круги
  const [countdown, setCountdown] = useState<number | null>(3); // Обратный отсчет перед началом
  const [clickData, setClickData] = useState<ClickData[]>([]); // Данные о кликах
  const [score, setScore] = useState(0); // Счетчик очков
  const { userToken, setUser } = useUserStore();

  // Получаем текущий уровень и стадию из данных игры
  const currentLevel = gameData.generated[levelIndex];
  const currentStageData = currentLevel.data[stageIndex];

  

  // Обработка клика по зеленой монете
  const handleGreenClick = (coinX: number, coinY: number) => {
    setScore(score + 10);
    const newClickData: ClickData = {
      isGreen: true,
      levelIndex,
      stageIndex,
      timeLeft,
      timestamp: Date.now().toString(),
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
      timestamp: Date.now().toString(),
      coinX, // Добавляем координаты
      coinY, // Добавляем координаты
    };
    setClickData((prev) => [...prev, newClickData]); // Сохраняем данные клика
    setGameOver(true); // Игра завершена
    sendClickData(); // Отправляем данные при завершении игры
  };

  async function sendGameData (data: any): Promise<void>{
    try {
      const response = await axios.put(`${BACKEND_URL}/users/game/`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken,
        },
      });
      setUser(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  // Функция для отправки данных на сервер
  const sendClickData = async () => {
    sendGameData({data:clickData, uuid: gameData.uuid});
    console.log({ clicks: clickData });
  };

  const renderCircles = () => {
    const imageCount: Record<string, number> = {}; // Хранит количество каждого изображения
  
    const images = [
      bomeLogo,
      bonkLogo,
      brettLogo,
      dogeCoinLogo,
      dogsLogo,
      pepeLogo,
      ponkeLogo,
    ];
  
    // Функция для получения случайного изображения с ограничением
    const getRandomImage = () => {
      const availableImages = images.filter((img) => (imageCount[img] || 0) < 2); // Учитываем ограничение
      if (availableImages.length === 0) {
        return null; // Если изображения исчерпаны, возвращаем null
      }
      const randomIndex = Math.floor(Math.random() * availableImages.length);
      const selectedImage = availableImages[randomIndex];
      imageCount[selectedImage] = (imageCount[selectedImage] || 0) + 1;
      return selectedImage;
    };
  
    // Генерация кругов
    const circlesArray = currentStageData.coins.map((coin, index) => {
      const position = { top: coin.y, left: coin.x }; // Позиция монеты
      const randomImage = getRandomImage(); // Генерация изображения
  
      return (
        <Circle
          key={`${index}-${coin.x}-${coin.y}-${coin.type}`}
          isGreen={coin.type === 'good'}
          image={randomImage || ''} // Подставляем случайное изображение
          onClick={
            coin.type === 'good'
              ? () => handleGreenClick(coin.x, coin.y)
              : () => handleWrongClick(coin.x, coin.y)
          }
          position={position}
        />
      );
    });

    setCircles(circlesArray);  
    return circlesArray; // Возвращаем массив кругов
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

  // Обновляем таймер при смене уровня
  useEffect(() => {
    setTimeLeft(currentLevel.time);
  }, [levelIndex]);

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
    if (levelIndex + 1 < gameData.generated.length) {
      setLevelIndex(levelIndex + 1); // Переход на следующий уровень
      setStageIndex(0); // Начинаем с первой стадии нового уровня
      setLevelComplete(false); // Сбрасываем флаг завершения уровня
      startCountdown(); // Запускаем обратный отсчет
    } else {
      setGameOver(true); // Игра завершена
      sendClickData(); // Отправляем данные при завершении игры
    }
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
            <div className='score'>
              <p>Score: {score}</p>
            </div>
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
