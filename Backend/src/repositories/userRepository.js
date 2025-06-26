import User from '../schema/user.js';
import crudRepository from './crudRepository.js';

const userRepository = {
  ...crudRepository(User),
  getByEmail: async function (email) {
    const user = await User.findOne({ email: email });
    return user;
  },
  getByuserame: async function (username) {
    const user = await User.findOne({ username: username }).select('-password'); //exclude PassWord

    return user;
  }
};

export default userRepository;
