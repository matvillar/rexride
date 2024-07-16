import { NewChatSessionParams } from '../constants/types/NewChatSessionParams';
import Chat from '../models/chat.model';
import { connect } from '../mongoose';
import { handleError } from '../utils';

export async function createChatSession({
  currentUser,
  otherUser,
}: NewChatSessionParams) {
  try {
    await connect();
  } catch (error) {
    handleError(error);
  }
}
