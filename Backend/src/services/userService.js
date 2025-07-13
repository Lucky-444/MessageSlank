import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../repositories/userRepository.js';
import { createJWT } from '../utils/common/authUtils.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

export const signupService = async (data) => {
  try {
    const newUser = await userRepository.create(data);
    return newUser;
  } catch (error) {
    console.log('User Service Layer Error', error);
    if (error.name === 'ValidationError') {
      throw new ValidationError(
        {
          error: error.errors
        },
        error.message
      );
    }

    //duplicate things
    //it is already present

    if (error.code === 11000 && error.name === 'MongoServerError') {
      throw new ValidationError(
        {
          error: ['A user with Same Email or Username already exists']
        },
        'A user with Same Email or Username already exists'
      );
    }
  }
};

export const signInService = async (data) => {
  try {
    const user = await userRepository.getByEmail(data.email);
    if (!user) {
      throw new ClientError({
        explanation: ' invalid data is send  from the client',
        message: 'No Registered User found with this email',
        statusCode: StatusCodes.NOT_FOUND
      });
    }

    //now match the password
    const isMatch = bcrypt.compareSync(data.password, user.password);
    if (!isMatch) {
      throw new ClientError({
        explanation: ' invalid password send by the client',
        message: 'password is Not Correct',
        statusCode: StatusCodes.BAD_REQUEST
      });
    }

    const token = createJWT({ id: user._id, email: user.email });

    return {
      username: user.username,
      avatar: user.avatar,
      email: user.email,
      token: token,
      _id  : user._id,
    };
  } catch (error) {
    console.log('User Signin Eroor', error);
    throw error;
  }
};
