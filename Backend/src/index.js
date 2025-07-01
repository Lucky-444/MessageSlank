import express from 'express';
import httpStatus from 'http-status-codes';
const { StatusCodes } = httpStatus;
import connectDB from './config/dbConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRoutes.js';
import bullServerAdapter from './config/bullboardConfig.js';


const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use('/ui' , bullServerAdapter.getRouter())

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'Pong', success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
