import { Document, Types } from 'mongoose';
import { UserTypeEnum } from '../enums/UserTypeEnum';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  id: string;
  username: string;
  name: string;
  userImage: string;
  phoneNumber?: string;
  userType: UserTypeEnum;
  isOnboard: boolean;
  chats: { _id: string; name: string; userImage: string }[];
  createdAt: Date;
}
