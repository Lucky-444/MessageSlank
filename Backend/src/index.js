import express from 'express';
import httpStatus from 'http-status-codes';
const { StatusCodes } = httpStatus;
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import bullServerAdapter from './config/bullboardConfig.js';
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import channelSocketHandler from './controllers/channelSocketController.js';
import messageSocketHandler from './controllers/messageSocketController.js';
import { verifyEmailController } from './controllers/userController.js';
import userSocketHandler from './controllers/userSocketHandler.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use('/ui', bullServerAdapter.getRouter());

app.use('/api', apiRouter);

app.get('/verify/:token', verifyEmailController);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'Pong', success: true });
});

io.on('connection', (socket) => {
  userSocketHandler(io, socket);
  messageSocketHandler(io, socket);
  channelSocketHandler(io, socket);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
