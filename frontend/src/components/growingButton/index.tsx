import '@styles/Main.scss';

import { useEffect, useState } from 'react';

import { useUserStore } from '@/store';

export function GrowingButton() {
  const claim = useUserStore((state) => state.claim);
  const lastPressTime = useUserStore((state) => state.user.claimAt);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!lastPressTime) return; // Если времени нет, ничего не делаем

    const lastPressDate = new Date(lastPressTime);
    const nextPressDate = new Date(
      lastPressDate.getTime() + 24 * 60 * 60 * 1000,
    );

    const updateRemainingTime = () => {
      const now = new Date();
      const remainingTime = nextPressDate.getTime() - now.getTime();

      if (remainingTime <= 0) {
        setTimeLeft(0);
      } else {
        setTimeLeft(remainingTime);
      }
    };

    // Первоначальный расчет
    updateRemainingTime();

    const interval = setInterval(updateRemainingTime, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(interval);
  }, [lastPressTime]);

  const formatTimeLeft = (time: number) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className='growing'>
      {timeLeft > 0 ? (
        <div className='unactive'>
          <span>Time to claim left: {formatTimeLeft(timeLeft)}</span>
        </div>
      ) : (
        <div className='claim' style={{ cursor: 'pointer' }} onClick={claim}>
          <span>Claim 100</span>
        </div>
      )}
    </div>
  );
}
