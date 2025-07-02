import express from 'express';
import httpStatus from 'http-status-codes';
const { StatusCodes } = httpStatus;
import { createServer } from 'http';
import { Server } from 'socket.io';

import bullServerAdapter from './config/bullboardConfig.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import messageHandler from './controllers/messageSocketController.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use('/ui', bullServerAdapter.getRouter());

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'Pong', success: true });
});

io.on('connection', (socket) => {
  // console.log('a user connected', socket.id);
  // // server can send the data
  // //how server can send the data to the client
  // // setInterval(() => {
  // //   socket.emit('message', 'This is a message From server');
  // // }, 3000);

  // //now client wants to send the data to the server
  // socket.on('messageFromClient', (data) => {
  //   console.log('client send Data', data);

  //   // socket.broadcast.emit('new Message' , data.toUpperCase())
  //   io.emit('new Message' , data.toUpperCase())
  // });

  messageHandler(io, socket);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
