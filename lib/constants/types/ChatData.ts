import { IChat } from '../interfaces/IChats';

export type ChatData = {
  data: IChat[];
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
  isOnline: boolean;
  unread: number;
};
