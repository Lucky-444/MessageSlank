import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import { ENABLE_EMAIL_VERIFICATION } from '../config/serverConfig.js';
import { addEmailToMailQueue } from '../producer/mailQueueProducers.js';
import userRepository from '../repositories/userRepository.js';
import { createJWT } from '../utils/common/authUtils.js';
import { verifyEmailMail } from '../utils/common/mailObject.js';
import ClientError from '../utils/errors/clientError.js';
import ValidationError from '../utils/errors/validationError.js';

export const signupService = async (data) => {
  try {
    const newUser = await userRepository.signUpUser(data);

    if (ENABLE_EMAIL_VERIFICATION) {
      // If email verification is enabled, we need to send a verification email
      const verificationToken = newUser.verificationToken;
      addEmailToMailQueue({
        ...verifyEmailMail(verificationToken),
        to: newUser.email
      });
    }
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

export const verifyTokenService = async (token) => {
  try {
    const user = await userRepository.getByToken(token);
    if (!user) {
      throw new ClientError({
        explanation: 'Invalid verification token',
        message: 'No user found with this verification token',
        statusCode: StatusCodes.NOT_FOUND
      });
    }
    // Check if the token is expired
    if (user.verificationTokenExpiry < new Date()) {
      throw new ClientError({
        explanation: 'Verification token has expired',
        message: 'The verification token is no longer valid',
        statusCode: StatusCodes.GONE
      });
    }
    // If the token is valid, mark the user as verified
    user.isVerified = true;
    user.verificationToken = null; // Clear the verification token after successful verification
    user.verificationTokenExpiry = null; // Clear the token expiry date
    // Save the user
    await user.save();
    return user;
  } catch (error) {
    console.log('User Verification Error', error);
    if (error.statusCode) {
      throw error;
    }
    throw new ClientError({
      explanation: 'Error while verifying user token',
      message: 'An error occurred while verifying the user token',
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    });
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
      _id: user._id
    };
  } catch (error) {
    console.log('User Signin Eroor', error);
    throw error;
  }
};
