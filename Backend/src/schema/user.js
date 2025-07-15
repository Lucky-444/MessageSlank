import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email already exists'],
      match: [
        // eslint-disable-next-line no-useless-escape
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    username: {
      type: String,
      required: [true, 'Name is required'],
      unique: [true, 'Username already exists'],
      match: [
        /^[a-zA-Z0-9]+$/,
        'Username should only contain letters and numbers'
      ]
    },
    avatar: {
      type: String
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String
    },
    verificationTokenExpiry: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', function saveUser(next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  // Hash password before saving a user
  user.password = bcrypt.hashSync(user.password, SALT);
  user.avatar = `https://robohash.org/${user.username}`;
  if (this.isNew) {
    user.verificationToken = uuidv4().substring(0, 10).toUpperCase();
    user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token valid for 24 hours
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
