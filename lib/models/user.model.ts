import mongoose from 'mongoose';
import { UserTypeEnum } from '../constants/enums/UserTypeEnum';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  userImage: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  userType: {
    type: String,
    enum: [UserTypeEnum.DRIVER, UserTypeEnum.PASSENGER],
    default: UserTypeEnum.PASSENGER,
    required: true,
  },
  isOnboard: { type: Boolean, required: true },
  chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
