import gql from 'graphql-tag';

export default gql`
  query {
    users {
      _id
      avatar
      firstName
      lastName
    }
  }
`;
