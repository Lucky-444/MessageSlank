import userRepository from '../repositories/userRepository.js';
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
