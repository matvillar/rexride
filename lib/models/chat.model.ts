import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: [],
    },
  ],

  createdAt: { type: Date, default: Date.now },
  lastMessage: { type: String },
});

const Chat = mongoose.models.Chat || mongoose.model('Chat', chatSchema);

export default Chat;
