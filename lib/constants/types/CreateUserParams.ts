import { UserTypeEnum } from '../enums/UserTypeEnum';

export type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  name: string;
  userImage: string;
  phoneNumber?: string;
  userType: UserTypeEnum;
  isOnboard: boolean;
  chats: { _id: string; name: string; userImage: string }[];
  createdAt: Date;
};
