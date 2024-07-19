import mongoose from 'mongoose';
import { UserTypeEnum } from '../constants/enums/UserTypeEnum';

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
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
  isOnboard: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  rides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
