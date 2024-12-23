import '@styles/Main.scss';

import { GrowingButton } from '@components/growingButton';
import blind from '@images/blind.png';
import growing1 from '@images/growing1.png';
import growing2 from '@images/growing2.png';
import growing3 from '@images/growing3.png';
import trueImg from '@images/true.png';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { Popup } from '@/components';
import { useUserStore } from '@/store';
import { ROUTES } from '@/utils/';

export const Main = () => {
  // const [earnedPoints, setEarnedPoints] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const { user } = useUserStore((state) => state);
  const { balance, name } = user;

  // const handleStartGrowing = () => {
  //   setIsGrowing(true);
  //   setStartTime(new Date().getTime());
  //   setEarnedPoints(0);
  //   // setTimeLeft(GROWING_DURATION / 1000);
  // };

  // const handleClaimPoints = () => {
  //   if (!isGrowing && earnedPoints > 0) {
  //     const newPoints = points + earnedPoints;
  //     setPoints(newPoints);
  //     setEarnedPoints(0);

  //     if (newPoints >= 300000) {
  //       setShowPopup(true);
  //     }
  //   }
  // };

  const getPlantImage = () => {
    if (user.balance>= 300000) {
      return growing3;
    } else if (user.balance >= 200000) {
      return growing2;
    } else {
      return growing1;
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className='main'>
      <div className='blind'>
        <img src={blind} alt='Blind' />
      </div>
      <div className='name'>
        <span>{name}</span>
      </div>
      <div className='points'>
        <img height={32} src={trueImg} alt='true' />
        <span>{balance}</span>
      </div>
      <NavLink to={ROUTES.game} className='game-button'>
        TAP TO GROW
      </NavLink>
      <div className='growing-wrapepr'>
        <div className='plant'>
          <img src={getPlantImage()} alt='Growing plant' />
        </div>
        {/* <div className='growing'>
          {!isGrowing && earnedPoints === 0 && (
            <div className='start' onClick={handleStartGrowing}>
              <span>Start Growing</span>
            </div>
          )}

          {!isGrowing && earnedPoints > 0 && (
            <div className='claim' onClick={handleClaimPoints}>
              <span>Claim {earnedPoints.toLocaleString()}</span>
            </div>
          )}

          {isGrowing && (
            <div className='unactive'>
              <span>
                Claim {POINTS_PER_GROW.toLocaleString()} in {timeLeft}s
              </span>
            </div>
          )}
        </div> */}
        <GrowingButton />
      </div>
      {showPopup && <Popup onClose={closePopup} />}
    </div>
  );
};
