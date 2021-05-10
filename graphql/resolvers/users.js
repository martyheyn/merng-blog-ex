const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../../util/check-auth');
const { UserInputError } = require('apollo-server');
const {
  validateRegisterInput,
  validateLoginInput,
  validateEditUserInput,
} = require('../../util/validators');

const User = require('../../models/User.js');
const Post = require('../../models/Post.js');
const { SECRET_KEY } = require('../../config.js');

const generateToekn = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

const usersResolvers = {
  Query: {
    async getUser(_, { username }) {
      try {
        const user = await User.findOne({ username });
        if (user) {
          return user;
        } else {
          throw new Error('No user brah/ User not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      const user = await User.findOne({ username });

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      // compare this password to the password of the user
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentails';
        throw new UserInputError('Wrong credentails', { errors });
      }

      // Issue a token for the user if they logged in
      const token = generateToekn(user);

      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }

      // hash password & create auth token
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        bio: '',
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      // create token for the user
      const token = generateToekn(res);

      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
    async editUser(_, { userId, email, bio }, context) {
      const { errors, valid } = validateEditUserInput(email);
      const user = checkAuth(context);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      let updateUser = await User.findById(userId);
      if (user.username === updateUser.username) {
        updateUser = await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              email,
              bio,
            },
          },
          { new: true, useFindAndModify: false }
        );
        const res = await updateUser.save();

        return {
          ...res._doc,
          id: res.id,
        };
      }
    },
    async deleteUser(_, { userId }, context) {
      const user = checkAuth(context);

      try {
        const deleteUser = await User.findById(userId);
        await Post.deleteMany({ username: deleteUser.username });
        if (user.username === deleteUser.username) {
          await deleteUser.remove();
          return 'User deleted successfully';
        } else {
          throw new Error('You cannot do this, User not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = usersResolvers;
