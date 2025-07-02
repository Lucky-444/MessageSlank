import { createMessageService } from '../services/messageService.js';
import {
  NEW_MESSAGE_EVENT,
  NEW_MESSAGE_RECEVIED_EVENT
} from '../utils/common/eventConstants.js';



export default function messageHandler(io, socket) {
  socket.on(
    NEW_MESSAGE_EVENT,
    async function createMessageSocketHandler(data, cb) {
      const messageResponse = await createMessageService(data);
      socket.broadcast.emit(NEW_MESSAGE_RECEVIED_EVENT, messageResponse);
      cb({
        message: 'SuccessFully created the message',
        success: true,
        data: messageResponse
      });
    }
  );
}
