import React from 'react';
import { useSelector } from 'react-redux';
import { selectActivePage } from '@store/Slice';
import Main from '@pages/main/Index';
import Leaderboard from '@/pages/leaderboard/Index';
import Tasks from '@/pages/tasks/Index';
import Friends from '@pages/friends/Index'
import Navigation from '@components/navigation/Navigation';

const App: React.FC = () => {
  const activePage = useSelector(selectActivePage);

  return (
    <div>
      {activePage === 'Index' && <Main />}
      {activePage === 'Index' && <Leaderboard />}
      {activePage === 'Index' && <Tasks />}
      {activePage === 'Index' && <Friends />}
      <Navigation />
    </div>
  );
};

export default App;
