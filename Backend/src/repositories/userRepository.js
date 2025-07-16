import User from '../schema/user.js';
import crudRepository from './crudRepository.js';

const userRepository = {
  ...crudRepository(User),
  signUpUser: async function (data) {
    const user = new User(data);
    await user.save();
    return user;
  },
  getByEmail: async function (email) {
    const user = await User.findOne({ email: email });
    return user;
  },
  getByuserame: async function (username) {
    const user = await User.findOne({ username: username }).select('-password'); //exclude PassWord

    return user;
  },
  getByToken: async function (token) {
    const user = await User.findOne({ verificationToken: token });
    return user;
  }
};

export default userRepository;
