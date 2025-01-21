import { gql } from 'graphql-tag';

export const typeDefs = gql`
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
