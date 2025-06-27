import express from 'express';

import { signup } from '../../controllers/userController.js';
import { userSignupSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

//pass from req.body ==> {
//  x-www-form-urlencoded
//email , password, username
// }
router.post('/signup', validate(userSignupSchema), signup);

export default router;
