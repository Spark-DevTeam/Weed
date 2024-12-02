import '@styles/Friends.scss';

import blind from '@images/blind.png';
import friend from '@images/friend.png';
import noFriends from '@images/noFriends.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '@/utils';
import { useUserStore } from '@/store';

export const Friends = () => {
  const { userToken, setUser } = useUserStore();

  const [friends, setFriends] = useState<any>([]);

  async function getFriends() {
    const response = await axios.get<ITask[]>(`${BACKEND_URL}/users/referrals/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    });

    const data = response.data;

    console.log(response.data);

    setFriends(data);
  }

  async function getClaim() {
    const response = await axios.post<any>(`${BACKEND_URL}/users/referrals/`,{}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    });

    const data = response.data;

    setUser(data);

    setFriends(data);
  }

  useEffect(() => {
    getFriends();
  }, []);


  const inviteFriend = () => {
    console.log('invite friend');
   
  };

  return (
    <div className='friends'>
      <div className='blind'>
        <img src={blind} alt='Blind' />
      </div>
      <div className='title'>Invite Friends</div>
      <div className='subtitle'>
        <span>Invite</span> your friends and <span>earn points</span> % from
        their earnings
      </div>

      {friends.friends && friends.friends.length > 0 ? (
        <div className='friends-list'>
          {friends.friends.map((friendData:any, index:number) => (
            <div className='item' key={index}>
              <div className='left'>
                <div className='ava'></div>
                <div className='info'>
                  <div className='name'>{friendData.name}</div>
                  <div className='friend'>
                    <img src={friend} alt='Friend icon' />
                    <span>+{friendData.friendsCount}</span>
                  </div>
                </div>
              </div>
              <div className='right'>
                <span>{friendData.points.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='no-friends'>
          <img src={noFriends} alt='No Friends' />
          <p>
            You have no friends invited yet. Start inviting now to earn points!
          </p>
        </div>
      )}

      <div className='buttons'>
        { <button className='claim' onClick={getClaim}>Claim {friends.summary}</button>}
        <button className='invite' onClick={inviteFriend}>Invite</button>
      </div>
    </div>
  );
};
