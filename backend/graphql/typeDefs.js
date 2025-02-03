import { gql } from 'graphql-tag';

export const typeDefs = gql`
  # Queries
  type Query {
    getUser(id: ID!): User
    getPosts: [Post]
    getMyProfile: User
  }

  # Mutations
  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createPost(content: String!): Post
  }

  # User Type
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String
    posts: [Post]
  }

  # Post Type
  type Post {
    id: ID!
    content: String!
    author: User!
    createdAt: String
  }

  # Auth Payload for JWT Response
  type AuthPayload {
    token: String!
    user: User!
  }
`;
