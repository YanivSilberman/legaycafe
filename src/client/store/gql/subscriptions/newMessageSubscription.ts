import gql from 'graphql-tag';

export default gql`
  subscription messageCreated {
    messageCreated {
      _id
      text
      user
      createdAt
    }
  }
`;
