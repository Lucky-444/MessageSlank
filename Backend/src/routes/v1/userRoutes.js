import express from 'express';

import { signin, signup } from '../../controllers/userController.js';
import { userSigninSchema, userSignupSchema } from '../../validators/userSchema.js';
import { validate } from '../../validators/zodValidator.js';

const router = express.Router();

//pass from req.body ==> {
//  x-www-form-urlencoded
//email , password, username
// }
router.post('/signup', validate(userSignupSchema), signup);

router.post('/signin', validate(userSigninSchema), signin);

export default router;
