import { gql } from 'apollo-server-express';

export const ImutationResponse = gql`
  type ImutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }
`;
