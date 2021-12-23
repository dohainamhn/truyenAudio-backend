import { gql } from 'apollo-server-express';

export const testTypeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;
