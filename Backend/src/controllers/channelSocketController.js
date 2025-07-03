import { JOIN_CHANNEL } from '../utils/common/eventConstants.js';

export default function messageHandler(io, socket) {
  socket.on(JOIN_CHANNEL, async function joinChannelHandler(data, cb) {
    const roomId = data.channelId;
    console.log(`${socket.id} joined room ${roomId}`);
    socket.join(roomId);
    cb?.({
      message: 'SuccessFully joined the channel',
      success: true,
      data: roomId
    });
  });
}
