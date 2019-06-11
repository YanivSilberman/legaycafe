import gql from 'graphql-tag';

export default gql`
  subscription userIsTyping($chat: ID!) {
    userIsTyping(chat: $chat) {
      _id
      isTyping
    }
  }
`;
