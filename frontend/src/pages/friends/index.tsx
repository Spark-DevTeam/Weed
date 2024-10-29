import '@styles/Friends.scss';

import blind from '@images/blind.png';
import friend from '@images/friend.png';
import noFriends from '@images/noFriends.png';
import { useState } from 'react';

export const Friends = () => {
  // Example state to simulate if there are friends or not
  const [friends, setFriends] = useState([
    {
      name: 'Huden',
      points: 2500320,
      friendsCount: 5,
    },
    {
      name: 'Huden',
      points: 2500320,
      friendsCount: 5,
    },
  ]);

  const inviteFriend = () => {
    // This function simulates inviting a new friend
    const newFriend = {
      name: 'New Friend',
      points: 0,
      friendsCount: 0,
    };
    setFriends([...friends, newFriend]); // Update the state to add a new friend
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

      {friends.length > 0 ? (
        <div className='friends-list'>
          {friends.map((friendData, index) => (
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
        <button className='claim'>Claim 25,008</button>
        <button className='invite' onClick={inviteFriend}>Invite</button>
      </div>
    </div>
  );
};
