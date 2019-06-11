import gql from 'graphql-tag';

export default gql`
  mutation createMessage($userId: ID! $text: String! $chat: ID!) {
    createMessage(
      userId: $userId,
      text: $text,
      chat: $chat
    ) {
      _id
      text
    }
  }
`;
