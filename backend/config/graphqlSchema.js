import { buildSchema } from "graphql";


// Define GraphQL types and operations using SDL
const typeDefs = `
  type Query {
    getUser(id: ID!): User
    getPosts: [Post]
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    createPost(content: String!, authorId: ID!): Post
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
  }

  type Post {
    id: ID!
    content: String!
    author: User!
    createdAt: String
  }
`;

// Define resolvers for the schema
const resolvers = {
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

// Combine type definitions and resolvers into a schema
const schema = buildSchema({ typeDefs, resolvers });

export default schema;
