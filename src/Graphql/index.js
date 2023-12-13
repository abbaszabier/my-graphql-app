import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($input: NewUser!) {
    createUser(input: $input)
  }
`;

export const LOGIN = gql`
  mutation Login($input: Login!) {
    login(input: $input)
  }
`;

export const CREATE_LINK = gql`
  mutation CreateLink($input: NewLink!) {
    createLink(input: $input) {
      id
      title
      address
      user {
        id
        name
      }
    }
  }
`;

export const GET_LINKS = gql`
  query {
    links {
      id
      title
      address
      user {
        id
        name
      }
    }
  }
`;
