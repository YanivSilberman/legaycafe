import gql from 'graphql-tag';

export default gql`
  query Chat($users: String) {
    Chat(users: $users) {
      _id
    }
  }
`;
