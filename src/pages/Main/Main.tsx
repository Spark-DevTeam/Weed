import { useState, useEffect } from "react";
import "@styles/Index.scss";
import blind from "@images/blind.png";
import weeds from "@images/weeds.png";
import lightning from "@images/lightning.png";
import lightningGray from "@images/lightning-gray.png";
import growing1 from "@images/growing1.png";
import growing2 from "@images/growing2.png"; // Новое изображение растения
import growing3 from "@images/growing3.png"; // Новое изображение растения

const GROWING_DURATION = 2 * 1000; // 2 секунды в миллисекундах
const POINTS_PER_GROW = 25000; // кол-во поинтов за цикл выращивания

const Main = () => {
  const [isGrowing, setIsGrowing] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [points, setPoints] = useState(250320); // начальное количество поинтов
  const [earnedPoints, setEarnedPoints] = useState(0); // поинты, заработанные за текущий цикл
  const [timeLeft, setTimeLeft] = useState(0); // Оставшееся время в секундах

  // Устанавливаем таймер для процесса роста
  useEffect(() => {
    if (isGrowing && startTime) {
      const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeElapsed = currentTime - startTime;
        const timeRemaining = GROWING_DURATION - timeElapsed;

        if (timeRemaining <= 0) {
          clearInterval(timer);
          setIsGrowing(false); // Остановка роста
          setEarnedPoints(POINTS_PER_GROW); // Заработанные поинты за 2 секунды
          setTimeLeft(0); // Таймер обнулён
        } else {
          setTimeLeft(Math.ceil(timeRemaining / 1000)); // Обновление оставшегося времени в секундах
        }
      }, 100);

      return () => clearInterval(timer);
    }
  }, [isGrowing, startTime]);

  // Начало процесса роста
  const handleStartGrowing = () => {
    setIsGrowing(true);
    setStartTime(new Date().getTime());
    setEarnedPoints(0);
    setTimeLeft(GROWING_DURATION / 1000); // Устанавливаем начальное время 2 секунды
  };

  // Получение поинтов
  const handleClaimPoints = () => {
    if (!isGrowing && earnedPoints > 0) {
      setPoints((prevPoints) => prevPoints + earnedPoints);
      setEarnedPoints(0);
    }
  };

  // Логика для выбора изображения растения
  const getPlantImage = () => {
    if (points >= 300000) {
      return growing3; // Изображение для 300к+
    } else if (points >= 200000) {
      return growing2; // Изображение для 200к+
    } else {
      return growing1; // Изображение для 100к+
    }
  };

  return (
    <div className="main">
      <div className="blind">
        <img src={blind} alt="Blind" />
      </div>
      <div className="name">
        <span>huden</span>
      </div>
      <div className="points">
        <span>{points.toLocaleString()}</span>
      </div>
      <button className="game-button">TAP TO GROW</button>
      <div>
        <img src={weeds} alt="Weeds" />
      </div>
      <div className="growing-wrapepr">
        <div className="plant">
          {/* Изображение растения в зависимости от количества поинтов */}
          <img src={getPlantImage()} alt="Growing plant" />
        </div>
        <div className="growing">
          {/* Кнопка Start Growing */}
          {!isGrowing && earnedPoints === 0 && (
            <div className="start" onClick={handleStartGrowing}>
              <img src={lightning} alt="Start Growing" />
              <span>Start Growing</span>
            </div>
          )}

          {/* Кнопка Claim, когда процесс завершён */}
          {!isGrowing && earnedPoints > 0 && (
            <div className="claim" onClick={handleClaimPoints}>
              <span>Claim {earnedPoints.toLocaleString()}</span>
            </div>
          )}

          {/* Кнопка во время процесса роста с таймером */}
          {isGrowing && (
            <div className="unactive">
              <img src={lightningGray} alt="Growing..." />
              <span>
                Claim {POINTS_PER_GROW.toLocaleString()} in {timeLeft}s
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
