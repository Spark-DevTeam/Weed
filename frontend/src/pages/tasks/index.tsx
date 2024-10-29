import '@styles/Tasks.scss';
import { Task } from '@components/task';
import blind from '@images/blind.png';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useUserStore } from '@/store';
import { BACKEND_URL } from '@/utils';

declare var Telegram: {
  WebApp: {
    openLink: (url: string) => void;
  };
};

export const Tasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const { userToken, updateUserBalance } = useUserStore((state) => state);

  async function getTasks() {
    const response = await axios.get<ITask[]>(`${BACKEND_URL}/tasks/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    });

    const data = response.data.map((task) => ({ ...task, taskStatus: 'open' }));

    console.log(response.data);

    setTasks(data);
  }

  async function claimTask(uuid: string) {
    console.log('claimed', userToken);

    try {
      const response = await axios.post(`${BACKEND_URL}/tasks/${uuid}/`, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userToken,
        },
      });

      if (response.status === 400) {
        throw new Error('wait');
      }

      if (response.data.reward !== undefined) {
        updateUserBalance(response.data.reward);
      }

      console.log(response.data);
    } catch (e) {
      console.error('Error in claimTask:', e);
      // Выбрасываем ошибку снова, чтобы она была обработана в .then() или .catch()
      throw e;
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  const handleTaskStatusChange = async (taskId: string, newStatus: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.uuid === taskId) {
          if (task.taskStatus === 'open') {
            Telegram?.WebApp.openLink(task.link); // Use optional chaining
            claimTask(task.uuid).catch((error) => {
              console.log('Claim task failed:', error);
            });
          } else if (task.taskStatus === 'claim') {
            claimTask(task.uuid)
              .then(() => getTasks())
              .catch((error) => {
                console.log('Claim task failed:', error);
                // Decide whether to continue executing
                return;
              });
          }
        }

        return task.uuid === taskId ? { ...task, taskStatus: newStatus } : task;
      }),
    );
  };

  return (
    <div className='tasks'>
      <div className='blind'>
        <img src={blind} alt='Blind' />
      </div>
      <div className='title'>Tasks</div>
      <div className='subtitle'>
        <span onClick={() => console.log(tasks)}>Complete</span> tasks and{' '}
        <span>earn</span> points
      </div>

      <div className='friends-list'>
        {tasks.map((task) => (
          <Task
            key={task.uuid}
            image={task.photo}
            description={task.text}
            reward={task.reward}
            taskStatus={task.taskStatus}
            uuid={task.uuid}
            link={task.link}
            onClick={claimTask}
            onTaskStatusChange={(newStatus) =>
              handleTaskStatusChange(task.uuid, newStatus)
            }
          />
        ))}
      </div>
    </div>
  );
};
