export const resolvers = {
  Query: {
    getUser: async (_, { id }, { models }) => models.User.findById(id),
    getPosts: async (_, __, { models }) => models.Post.find(),
  },
  Mutation: {
    createUser: async (_, { name, email }, { models }) => {
      const user = new models.User({ name, email });
      return user.save();
    },
    createPost: async (_, { content, authorId }, { models }) => {
      const post = new models.Post({ content, author: authorId });
      return post.save();
    },
  },
  User: {
    posts: async (user, _, { models }) => models.Post.find({ author: user.id }),
  },
  Post: {
    author: async (post, _, { models }) => models.User.findById(post.author),
  },
};
