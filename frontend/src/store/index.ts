import axios from 'axios';
import { create } from 'zustand';

import { BACKEND_URL } from '@/utils';

// interface User {
//   name: string;
//   balance: number;
//   code: string;
//   id: number;
//   banned: boolean;
//   photo: string;
//   claimAt: Date;
// }
//
// interface Leaderboard {
//   position: number;
//   users: { balance: number; name: string }[];
// }
//
// interface TgUserData {
//   query_id: string;
//   user: object;
//   auth_date: number;
//   start_param: string;
//   hash: string;
//   chat_instance: string;
//   chat_type: string;
// }
//
interface Store {
  user: User;
  userToken: string;
  isLoading: boolean;
  getToken: (data: TgUserData) => Promise<void>;
  getUser: () => Promise<void>;
  claim: () => Promise<void>;
  updateUserBalance: (newBalance: number) => void;
}

export const useUserStore = create<Store>((set, get) => ({
  user: {
    name: '',
    balance: 0,
    code: '',
    id: 0,
    banned: false,
    photo: '',
    claimAt: '',
  },
  userToken: '',
  isLoading: false,

  updateUserBalance: (newBalance: number) =>
    set({ user: { ...get().user, balance: get().user.balance + newBalance } }),

  getToken: async (data: TgUserData): Promise<void> => {
    try {
      const response = await axios.post(`${BACKEND_URL}/users/token/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { token } = response.data;
      set({ userToken: token });
    } catch (e) {
      console.error(e);
    }
  },

  getUser: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${BACKEND_URL}/users/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: get().userToken,
        },
      });
      set({ user: response.data });
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },

  claim: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${BACKEND_URL}/users/claim/`, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: get().userToken,
        },
      });
      set({ user: response.data });
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
