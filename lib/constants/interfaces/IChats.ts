import { Document, Types } from 'mongoose';

import { UserTypeEnum } from '../enums/UserTypeEnum';

export interface IChat extends Document {
  _id: string;
  users: { _id: string; name: string; userImage: string }[];
  messages: {
    _id: string;
    message: string;
    user: { _id: string; name: string; userImage: string };
  }[];
  createdAt: Date;
}
