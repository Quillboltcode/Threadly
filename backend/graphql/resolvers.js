import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

export const resolvers = {
  Query: {
    // Fetch a user by ID
    getUser: async (_, { id }, { models }) => {
      return await models.User.findById(id);
    },

    // Fetch all posts
    getPosts: async (_, __, { models }) => {
      return await models.Post.find().populate('author');
    },

    // Fetch the authenticated user
    getMyProfile: async (_, __, { models, user }) => {
      if (!user) throw new Error('Not authenticated');
      return await models.User.findById(user.id);
    },
  },

  Mutation: {
    // Signup user and return JWT token
    signup: async (_, { name, email, password }, { models }) => {
      const existingUser = await models.User.findOne({ email });
      if (existingUser) throw new Error('Email already in use');

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await models.User.create({ name, email, password: hashedPassword });

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      return { token, user };
    },

    // Login user and return JWT token
    login: async (_, { email, password }, { models }) => {
      const user = await models.User.findOne({ email });
      if (!user) throw new Error('User not found');

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) throw new Error('Invalid credentials');

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      return { token, user };
    },

    // Create a post (authenticated users only)
    createPost: async (_, { content }, { models, user }) => {
      if (!user) throw new Error('Not authenticated');

      const post = new models.Post({ content, author: user.id });
      await post.save();

      return post.populate('author');
    },
  },

  // Relationship Resolvers
  User: {
    posts: async (user, _, { models }) => {
      return await models.Post.find({ author: user.id });
    },
  },
  
  Post: {
    author: async (post, _, { models }) => {
      return await models.User.findById(post.author);
    },
  },
};
