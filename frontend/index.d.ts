interface TgUser {
  allows_write_to_pm: boolean;
  first_name: string;
  id: number;
  language_code: string;
  last_name: string;
  username: string;
}

interface TgUserData {
  query_id: string;
  chat_instance: string | undefined;
  chat_type: string | undefined;
  start_param: string | undefined;
  user: TgUser;
  auth_date: number;
  hash: string;
}

interface User {
  balance: number;
  banned: boolean;
  code: string;
  id: number;
  name: string;
  photo: string;
  claimAt: string;
}

interface ILeaderboard {
  position: number;
  users: { balance: number; name: string }[];
}

interface ITask {
  uuid: string;
  photo: string;
  text: string;
  reward: number;
  link: string;
  imitate: boolean;
  timer: string;
  taskStatus: string;
}

interface Coin {
  type: string;
  image?: string;
  x: number;
  y: number;
}

interface Level {
  level: number;
  time: number;
  data: { coins: Coin[]; stage: number }[];
}

interface IGame {
  uuid: string;
  generated: Level[];
}
