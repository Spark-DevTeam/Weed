import '@styles/Main.scss';

import { useEffect, useState } from 'react';
import lightningGray from '@images/lightning-gray.png';

import { useUserStore } from '@/store';

export function GrowingButton() {
  const claim = useUserStore((state) => state.claim);
  const lastPressTime = useUserStore((state) => state.user.claimAt);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!lastPressTime) return;

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
    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(interval);
  }, [lastPressTime]);

  const formatTimeLeft = (time: number) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className='growing'>
      {timeLeft > 0 ? (
        <div className='unactive'>
          <div></div>
          <div className='flex align-center gap-10'>
            <img src={lightningGray} alt='Lightning'></img>
            <p>Growing</p>
            <p>100</p>
          </div>
          <div className='unactive-timer'>
            <p className='fs-10'>{formatTimeLeft(timeLeft)}</p>
          </div>
        </div>
      ) : (
        <div className='claim' style={{ cursor: 'pointer' }} onClick={claim}>
          <span>Claim 100</span>
        </div>
      )}
    </div>
  );
}
