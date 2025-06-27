import express from 'express';
import { signup } from '../../controllers/userController.js';

const router = express.Router();


//pass from req.body ==> {
    //  x-www-form-urlencoded
    //email , password, username
  // }
router.post('/signup', signup);

export default router;
