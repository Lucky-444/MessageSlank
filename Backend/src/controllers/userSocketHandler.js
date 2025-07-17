const userSocketMap = {}; // { userId: socketId }

export function getRecieverSocketId(userId) {
  return userSocketMap[userId];
}

export default function userSocketHandler(io, socket) {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  console.log('online users are ->', Object.keys(userSocketMap));

  // Emit list of online users to everyone
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  // On disconnect: remove user and broadcast
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
}
