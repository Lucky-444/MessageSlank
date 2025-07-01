import express from 'express';
import httpStatus from 'http-status-codes';
const { StatusCodes } = httpStatus;
import connectDB from './config/dbConfig.js';
import mailer from './config/mailConfig.js';
import { PORT } from './config/serverConfig.js';
import apiRouter from './routes/apiRoutes.js';

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use('/api', apiRouter);

app.get('/ping', (req, res) => {
  return res.status(StatusCodes.OK).json({ message: 'Pong', success: true });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();

  const mailResponse = await mailer.sendMail({
    from: 'swainlucky868@gmail.com',
    to: 'swainlucky868@gmail.com',
    subject: 'Welcome Mail',
    text: 'Welcome Mail application'
  });

  console.log(mailResponse);
});
