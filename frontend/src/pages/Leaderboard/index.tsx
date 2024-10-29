import '@styles/Leaderboard.scss';

import { UserCard } from '@components/usercard';
import blind from '@images/blind.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useUserStore } from '@/store';
import { BACKEND_URL } from '@/utils';

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<ILeaderboard>({
    position: 0,
    users: [{ balance: 0, name: '' }],
  });
  const { user, userToken } = useUserStore((state) => state);

  async function getLeaderBoard() {
    try {
      const response = await axios.get(`${BACKEND_URL}/users/leaderboard/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken,
        },
      });
      setLeaderboard(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getLeaderBoard();
  }, []);

  return (
    <div className='leaderboard'>
      <div className='blind'>
        <img src={blind} alt='Blind' />
      </div>
      <div className='info'>
        <div className='name'>
          <span>Score: {user.balance}</span>
        </div>
        <div className='name'>
          <span>Place: {leaderboard.position}</span>
        </div>
      </div>
      <div className='subtitle'>
        The <span>first 1000</span> people <br /> will <span>receive WL</span>
      </div>
      <div className='ranking-table'>
        {leaderboard.users.map((user, index) => (
          <UserCard
            key={index + 1}
            rank={index + 1}
            nickname={user.name}
            score={user.balance}
          />
        ))}
      </div>
    </div>
  );
};
