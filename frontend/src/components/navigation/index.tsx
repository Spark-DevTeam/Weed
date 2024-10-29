import '@styles/Navigation.scss';

import friends from '@images/friends.png';
import friendsActive from '@images/friends-active.png';
import home from '@images/home.png';
import homeActive from '@images/home-active.png';
import ranking from '@images/ranking.png';
import rankingActive from '@images/ranking-active.png';
import tasks from '@images/tasks.png';
import tasksActive from '@images/tasks-active.png';
import { NavLink, useLocation } from 'react-router-dom';

import { ROUTES } from '@/utils/';

export const Navigation = () => {
  const { pathname } = useLocation();

  function boldNormal(isActive: boolean) {
    return { fontWeight: isActive ? 'bold' : 'normal' };
  }

  return (
    <div className='navigation'>
      <NavLink
        className='navBtn'
        to={ROUTES.home}
        style={({ isActive }) => boldNormal(isActive)}>
        <img
          className='img'
          src={pathname === ROUTES.home ? homeActive : home}
          alt='Home'
        />
      </NavLink>
      <NavLink
        className='navBtn'
        to={ROUTES.leaderboard}
        style={({ isActive }) => boldNormal(isActive)}>
        <img
          className='img'
          src={pathname === ROUTES.leaderboard ? rankingActive : ranking}
          alt='Index'
        />
      </NavLink>
      <NavLink
        className='navBtn'
        to={ROUTES.tasks}
        style={({ isActive }) => boldNormal(isActive)}>
        <img
          className='img'
          src={pathname === ROUTES.tasks ? tasksActive : tasks}
          alt='Index'
        />
      </NavLink>
      <NavLink
        className='navBtn'
        to={ROUTES.friends}
        style={({ isActive }) => boldNormal(isActive)}>
        <img
          className='img'
          src={pathname === ROUTES.friends ? friendsActive : friends}
          alt='Index'
        />
      </NavLink>
    </div>
  );
};
