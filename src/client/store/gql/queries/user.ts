import gql from 'graphql-tag';

export default gql`
  query {
    User {
      _id
      firstName
      lastName
      avatar
    }
  }
`;
