import React from 'react'; // Ensure you import React
import '@styles/UserCard.scss';
import first from '@images/first.png';
import second from '@images/second.png';
import third from '@images/third.png';
import weedgray from '@images/weedgray.png';

// Define the props interface
interface UserCardProps {
  rank: number;      // Rank should be a number
  nickname: string;  // Nickname should be a string
  score: number;     // Score should be a number
}

// Function for displaying rank or corresponding image
const getRankDisplay = (rank: number) => {
  switch (rank) {
    case 1:
      return <img src={first} alt="1st place" className="rank-image" />;
    case 2:
      return <img src={second} alt="2nd place" className="rank-image" />;
    case 3:
      return <img src={third} alt="3rd place" className="rank-image" />;
    default:
      return <div className="rank">{rank}</div>;
  }
};

// Use the props interface in the component
export const UserCard: React.FC<UserCardProps> = ({ rank, nickname, score }) => {
  return (
    <div className="usercard">
      <div className="right">
        {getRankDisplay(rank)}
        <div className="nickname">{nickname}</div>
      </div>
      <div className="left">
        <img src={weedgray} alt="Weed Icon" />
        <div className="score">{score}</div>
      </div>
    </div>
  );
};
