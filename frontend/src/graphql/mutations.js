import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($text: String!, $image: String) {
    createPost(text: $text, image: $image) {
      id
      text
      image
      user {
        id
        username
      }
    }
  }
`;