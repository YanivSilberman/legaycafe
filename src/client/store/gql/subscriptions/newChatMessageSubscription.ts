import gql from 'graphql-tag';

export default gql`
  subscription chatMessageCreated($chat: ID!) {
    chatMessageCreated(chat: $chat) {
      _id
      text
      user
      createdAt
    }
  }
`;
