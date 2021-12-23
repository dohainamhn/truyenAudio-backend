import { gql } from 'apollo-server-express';

export const authTypeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    me: User
  }
  type User {
    _id: ID!
    email: String!
    fullName: String
    role: String!
  }
  type Tokens {
    accessToken: String!,
    refreshToken: String!
  }
  type Message {
    message: String
  }
  type AuthUserResponse {
    data: Message
  }
  type Mutation {
    signUp(
      userName: String!
      email: String!
      password: String!
      adminKey: String!
    ): AuthUserResponse
    signIn(email: String!, password: String!): User
  }
`;
