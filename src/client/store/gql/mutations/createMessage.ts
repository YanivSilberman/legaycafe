import gql from 'graphql-tag';

export default gql`
  mutation createMessage($userId: ID! $text: String!) {
    createMessage(
      userId: $userId,
      text: $text
    ) {
      _id
      text
    }
  }
`;
